using Contracts;
using EnchereService.Data;
using MassTransit;

namespace EnchereService.Consumers;

public class OffreCreatedConsumer : IConsumer<OffreCreated>
{
    private readonly EnchereDbContext _dbContext;

    public OffreCreatedConsumer(EnchereDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task Consume(ConsumeContext<OffreCreated> context)
    {
        Console.WriteLine("--> Consume bid placed");

        var enchere = await _dbContext.Auctions.FindAsync(Guid.Parse(context.Message.AuctionId));

        if (enchere.CurrentHighBid == null
        || context.Message.BidStatus.Contains("Accepted")
        && context.Message.Amount > enchere.CurrentHighBid)
        {
            enchere.CurrentHighBid = context.Message.Amount;
            await _dbContext.SaveChangesAsync();
        }
    }
}
