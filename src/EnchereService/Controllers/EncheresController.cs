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
}
