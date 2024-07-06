using Contracts;
using EnchereService.Data;
using EnchereService.Models;
using MassTransit;

namespace EnchereService.Consumers;

public class EnchereStartedConsumer : IConsumer<EnchereStarted>
{
    private readonly EnchereDbContext _dbContext;

    public EnchereStartedConsumer(EnchereDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task Consume(ConsumeContext<EnchereStarted> context)
    {
        Console.WriteLine("--> Consuming enchere started");

        var enchere = await _dbContext.Auctions.FindAsync(Guid.Parse(context.Message.AuctionId));

        enchere.Status = Statut.Live;

        await _dbContext.SaveChangesAsync();
    }
}