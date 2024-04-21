using AutoMapper;
using MassTransit;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Entities;
using OffreService.Contracts;
using OffreService.DTOs;
using OffreService.Models;

namespace OffreService.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OffresController : ControllerBase
{
    private readonly IMapper _mapper;
    private readonly IPublishEndpoint _publishEndpoint;

    public OffresController(IMapper mapper, IPublishEndpoint publishEndpoint)
    {
        _mapper = mapper;
        _publishEndpoint = publishEndpoint;
    }

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<OffreDto>> PostOffre(string enchereId, int montant)
    {
        var enchere = await DB.Find<Enchere>().OneAsync(enchereId);

        if (enchere == null)
        {
            // TODO : vérifier avec le service enchere s'il y a enchere
            return NotFound();
        }

        if (enchere.Seller == User.Identity.Name)
        {
            return BadRequest("Vous ne pouvez pas enchérir sur votre propre enchère");
        }

        var offre = new Offre
        {
            Amount = montant,
            AuctionId = enchereId,
            Bidder = User.Identity.Name
        };

        if (enchere.AuctionEnd < DateTime.UtcNow)
        {
            offre.BidStatus = OffreStatut.Finished;
        }
        else
        {
            var meilleureOffre = await DB.Find<Offre>()
                   .Match(e => e.AuctionId == enchereId)
                   .Sort(o => o.Descending(x => x.Amount))
                   .ExecuteFirstAsync();

            if (meilleureOffre != null && montant > meilleureOffre.Amount || meilleureOffre == null)
            {
                offre.BidStatus = montant > enchere.ReservePrice
                    ? OffreStatut.Accepted
                    : OffreStatut.AcceptedBelowReserve;
            }

            if (meilleureOffre != null && offre.Amount <= meilleureOffre.Amount)
            {
                offre.BidStatus = OffreStatut.TooLow;
            }
        }

        await DB.SaveAsync(offre);

        await _publishEndpoint.Publish(_mapper.Map<OffreCreated>(offre));

        return Ok(_mapper.Map<OffreDto>(offre));
    }

    [HttpGet("{enchereId}")]
    public async Task<ActionResult<List<OffreDto>>> GetOffresForEnchere(string enchereId)
    {
        var offres = await DB.Find<Offre>()
            .Match(e => e.AuctionId == enchereId)
            .Sort(o => o.Descending(e => e.BidTime))
            .ExecuteAsync();

        return offres.Select(_mapper.Map<OffreDto>).ToList();
    }
}
