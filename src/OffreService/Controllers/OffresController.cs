﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Entities;
using OffreService.Models;

namespace OffreService.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OffresController : ControllerBase
{
    [Authorize]
    [HttpPost]
    public async Task<ActionResult<Offre>> PostOffre(string enchereId, int amount)
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
            Amount = amount,
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

            if (meilleureOffre != null && amount > meilleureOffre.Amount || meilleureOffre == null)
            {
                offre.BidStatus = amount > enchere.ReservePrice
                    ? OffreStatut.Accepted
                    : OffreStatut.AcceptedBelowReserve;
            }

            if (meilleureOffre != null && offre.Amount <= meilleureOffre.Amount)
            {
                offre.BidStatus = OffreStatut.TooLow;
            }
        }

        await DB.SaveAsync(offre);

        return Ok(offre);
    }
}
