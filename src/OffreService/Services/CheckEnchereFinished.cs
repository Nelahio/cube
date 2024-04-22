

using MassTransit;
using MongoDB.Entities;
using Contracts;
using OffreService.Models;

namespace OffreService;

public class CheckEnchereFinished : BackgroundService
{
    private readonly ILogger<CheckEnchereFinished> _logger;
    private readonly IServiceProvider _services;

    public CheckEnchereFinished(ILogger<CheckEnchereFinished> logger, IServiceProvider services)
    {
        _logger = logger;
        _services = services;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("Vérifie les enchères terminées");

        stoppingToken.Register(() => _logger.LogInformation("==> La vérification des enchères est arrêtée"));

        while (!stoppingToken.IsCancellationRequested)
        {
            await CheckEncheres(stoppingToken);
        }
    }

    private async Task CheckEncheres(CancellationToken stoppingToken)
    {
        var finishedEncheres = await DB.Find<Enchere>()
            .Match(x => x.AuctionEnd <= DateTime.UtcNow)
            .Match(x => !x.Finished)
            .ExecuteAsync(stoppingToken);

        if (finishedEncheres.Count == 0) return;

        _logger.LogInformation("==> {count} enchères terminées trouvées", finishedEncheres.Count);

        using var scope = _services.CreateScope();
        var endpoint = scope.ServiceProvider.GetRequiredService<IPublishEndpoint>();

        foreach (var enchere in finishedEncheres)
        {
            enchere.Finished = true;
            await enchere.SaveAsync(null, stoppingToken);

            var offreRemportee = await DB.Find<Offre>()
                .Match(a => a.AuctionId == enchere.ID)
                .Match(b => b.BidStatus == OffreStatut.Accepted)
                .Sort(x => x.Descending(s => s.Amount))
                .ExecuteFirstAsync(stoppingToken);

            await endpoint.Publish(new EnchereFinished
            {
                ItemSold = offreRemportee != null,
                AuctionId = enchere.ID,
                Winner = offreRemportee?.Bidder,
                Amount = offreRemportee?.Amount,
                Seller = enchere.Seller
            }, stoppingToken);
        }
    }
}
