using AutoMapper;
using EnchereService.Data;
using EnchereService.DTOs;
using EnchereService.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EnchereService.Controllers;

[ApiController]
[Route("api/encheres")]
public class EncheresController : ControllerBase
{
    private readonly EnchereDbContext _context;
    private readonly IMapper _mapper;

    public EncheresController(EnchereDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<ActionResult<List<EnchereDto>>> GetAllEncheres()
    {
        var encheres = await _context.Auctions
        .Include(e => e.Item)
        .OrderBy(e => e.Item.Make)
        .ToListAsync();

        return _mapper.Map<List<EnchereDto>>(encheres);
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

    [HttpPost]
    public async Task<ActionResult<EnchereDto>> PostEnchere(CreateEnchereDto enchereDto)
    {
        var enchere = _mapper.Map<Enchere>(enchereDto);

        //TODO : ajouter l'utilisateur actuel comme vendeur
        enchere.Seller = "test";

        _context.Auctions.Add(enchere);

        var result = await _context.SaveChangesAsync() > 0;

        if (!result) return BadRequest("Impossible d'ajouter l'enchère");

        return CreatedAtAction(nameof(GetEnchereById),
        new { enchere.Id }, _mapper.Map<EnchereDto>(enchere));
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> PutEnchere(Guid id, UpdateEnchereDto updateEnchereDto)
    {
        var enchere = await _context.Auctions.Include(e => e.Item)
        .FirstOrDefaultAsync(e => e.Id == id);

        if (enchere == null) return NotFound();

        //TODO : check seller == username

        enchere.Item.Make = updateEnchereDto.Make ?? enchere.Item.Make;
        enchere.Item.Name = updateEnchereDto.Name ?? enchere.Item.Name;
        enchere.Item.Year = updateEnchereDto.Year ?? enchere.Item.Year;
        enchere.Item.Color = updateEnchereDto.Color ?? enchere.Item.Color;
        enchere.Item.Description = updateEnchereDto.Description ?? enchere.Item.Description;
        enchere.Item.ImageUrl = updateEnchereDto.ImageUrl ?? enchere.Item.ImageUrl;
        enchere.Item.Category = updateEnchereDto.Category ?? enchere.Item.Category;
        // enchere.Item.State = updateEnchereDto.State ?? enchere.Item.State;

        var result = await _context.SaveChangesAsync() > 0;

        if (result) return Ok();

        return BadRequest("Erreur lors de la mise à jour de l'enchère");
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteEnchere(Guid id)
    {
        var enchere = await _context.Auctions.FindAsync(id);

        if (enchere == null) return NotFound();

        //TODO : check seller == username

        _context.Auctions.Remove(enchere);

        var result = await _context.SaveChangesAsync() > 0;

        if (!result) return BadRequest("Erreur lors de la suppression de l'enchère");

        return Ok();
    }
}
