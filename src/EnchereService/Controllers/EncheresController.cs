using AutoMapper;
using AutoMapper.QueryableExtensions;
using Contracts;
using EnchereService.Data;
using EnchereService.DTOs;
using EnchereService.Models;
using MassTransit;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EnchereService.Controllers;

[ApiController]
[Route("api/encheres")]
public class EncheresController : ControllerBase
{
    private readonly EnchereDbContext _context;
    private readonly IMapper _mapper;
    private readonly IPublishEndpoint _publishEndpoint;

    public EncheresController(EnchereDbContext context, IMapper mapper, IPublishEndpoint publishEndpoint)
    {
        _context = context;
        _mapper = mapper;
        _publishEndpoint = publishEndpoint;
    }

    [HttpGet]
    public async Task<ActionResult<List<EnchereDto>>> GetAllEncheres(string date)
    {
        var query = _context.Auctions.OrderBy(a => a.Item.Make).AsQueryable();

        if (!string.IsNullOrEmpty(date))
        {
            query = query.Where(x => x.UpdatedAt.CompareTo(DateTime.Parse(date).ToUniversalTime()) > 0);
        }

        return await query.ProjectTo<EnchereDto>(_mapper.ConfigurationProvider).ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<EnchereDto>> GetEnchereById(Guid id)
    {
        var enchere = await _context.Auctions
        .Include(e => e.Item)
        .FirstOrDefaultAsync(e => e.Id == id);

        if (enchere == null) return NotFound();

        return _mapper.Map<EnchereDto>(enchere);
    }

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<EnchereDto>> PostEnchere(CreateEnchereDto enchereDto)
    {
        var enchere = _mapper.Map<Enchere>(enchereDto);

        enchere.Seller = User.Identity.Name;

        _context.Auctions.Add(enchere);

        var newEnchere = _mapper.Map<EnchereDto>(enchere);

        await _publishEndpoint.Publish(_mapper.Map<EnchereCreated>(newEnchere));

        var result = await _context.SaveChangesAsync() > 0;

        if (!result) return BadRequest("Impossible d'ajouter l'enchère");

        return CreatedAtAction(nameof(GetEnchereById),
        new { enchere.Id }, _mapper.Map<EnchereDto>(enchere));
    }

    [Authorize]
    [HttpPut("{id}")]
    public async Task<ActionResult> PutEnchere(Guid id, UpdateEnchereDto updateEnchereDto)
    {
        var enchere = await _context.Auctions.Include(e => e.Item)
        .FirstOrDefaultAsync(e => e.Id == id);

        if (enchere == null) return NotFound();

        if (enchere.Seller != User.Identity.Name) return Forbid();

        enchere.Item.Make = updateEnchereDto.Make ?? enchere.Item.Make;
        enchere.Item.Name = updateEnchereDto.Name ?? enchere.Item.Name;
        enchere.Item.Year = updateEnchereDto.Year ?? enchere.Item.Year;
        enchere.Item.Color = updateEnchereDto.Color ?? enchere.Item.Color;
        enchere.Item.Description = updateEnchereDto.Description ?? enchere.Item.Description;
        enchere.Item.ImageUrl = updateEnchereDto.ImageUrl ?? enchere.Item.ImageUrl;
        enchere.Item.Category = updateEnchereDto.Category ?? enchere.Item.Category;
        // enchere.Item.State = updateEnchereDto.State ?? enchere.Item.State;

        await _publishEndpoint.Publish<EnchereUpdated>(_mapper.Map<EnchereUpdated>(enchere));

        var result = await _context.SaveChangesAsync() > 0;

        if (result) return Ok();

        return BadRequest("Erreur lors de la mise à jour de l'enchère");
    }

    [Authorize]
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteEnchere(Guid id)
    {
        var enchere = await _context.Auctions.FindAsync(id);

        if (enchere == null) return NotFound();

        if (enchere.Seller != User.Identity.Name) return Forbid();

        _context.Auctions.Remove(enchere);

        await _publishEndpoint.Publish<EnchereDeleted>(new EnchereDeleted { Id = enchere.Id.ToString() });

        var result = await _context.SaveChangesAsync() > 0;

        if (!result) return BadRequest("Erreur lors de la suppression de l'enchère");

        return Ok();
    }
}
