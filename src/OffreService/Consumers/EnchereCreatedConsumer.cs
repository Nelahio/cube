using MassTransit;
using MongoDB.Entities;
using Contracts;
using OffreService.Models;

namespace OffreService.Consumers;

public class EnchereCreatedConsumer : IConsumer<EnchereCreated>
{
    public async Task Consume(ConsumeContext<EnchereCreated> context)
    {
        Console.WriteLine("--> Consuming enchere created");

        var enchere = new Enchere
        {
            ID = context.Message.Id.ToString(),
            Seller = context.Message.Seller,
            AuctionEnd = context.Message.AuctionEnd,
            ReservePrice = context.Message.ReservePrice,
        };

        await enchere.SaveAsync();
    }
}
