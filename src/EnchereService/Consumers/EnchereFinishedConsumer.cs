using EnchereService.Contracts;
using EnchereService.Data;
using EnchereService.Models;
using MassTransit;

namespace EnchereService.Consumers;

public class EnchereFinishedConsumer : IConsumer<EnchereFinished>
{
    private readonly EnchereDbContext _dbContext;

    public EnchereFinishedConsumer(EnchereDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task Consume(ConsumeContext<EnchereFinished> context)
    {
        Console.WriteLine("--> Consuming enchere finished");

        var enchere = await _dbContext.Auctions.FindAsync(Guid.Parse(context.Message.AuctionId));

        if (context.Message.ItemSold)
        {
            enchere.Winner = context.Message.Winner;
            enchere.SoldAmount = context.Message.Amount;
        }

        enchere.Status = enchere.SoldAmount > enchere.ReservePrice
        ? Statut.Finished : Statut.ReserveNotMet;

        await _dbContext.SaveChangesAsync();
    }
}
