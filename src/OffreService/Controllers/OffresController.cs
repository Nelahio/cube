using AutoMapper;
using MassTransit;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Entities;
using Contracts;
using OffreService.DTOs;
using OffreService.Models;
using OffreService.Services;

namespace OffreService.Controllers;

[ApiController]
[Route("api/offres")]
public class OffresController : ControllerBase
{
    private readonly IMapper _mapper;
    private readonly IPublishEndpoint _publishEndpoint;
    private readonly GrpcEnchereClient _grpcClient;

    public OffresController(IMapper mapper, IPublishEndpoint publishEndpoint, GrpcEnchereClient grpcClient)
    {
        _mapper = mapper;
        _publishEndpoint = publishEndpoint;
        _grpcClient = grpcClient;
    }

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<OffreDto>> PostOffre(string enchereId, int montant)
    {
        var enchere = await DB.Find<Enchere>().OneAsync(enchereId);

        if (enchere == null)
        {
            enchere = _grpcClient.GetEnchere(enchereId);

            if (enchere == null) return BadRequest("Impossible d'enchérir sur cette enchère pour le moment");
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
        if(enchere.AuctionStart > DateTime.UtcNow)
        {
            offre.BidStatus = OffreStatut.Scheduled;
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
