using MassTransit;
using MongoDB.Entities;
using Contracts;
using OffreService.Models;

namespace OffreService.Services;

public class CheckEnchereStarted : BackgroundService
{
    private readonly ILogger<CheckEnchereStarted> _logger;
    private readonly IServiceProvider _services;

    public CheckEnchereStarted(ILogger<CheckEnchereStarted> logger, IServiceProvider services)
    {
        _logger = logger;
        _services = services;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("Vérifie les enchères commencées");

        stoppingToken.Register(() => _logger.LogInformation("==> La vérification des enchères est arrêtée"));

        while (!stoppingToken.IsCancellationRequested)
        {
            await CheckEncheres(stoppingToken);

            await Task.Delay(5000, stoppingToken);
        }
    }

    private async Task CheckEncheres(CancellationToken stoppingToken)
    {
        var startedEncheres = await DB.Find<Enchere>()
            .Match(x => x.AuctionStart <= DateTime.UtcNow)
            .Match(x => !x.Started)
            .ExecuteAsync(stoppingToken);

        if (startedEncheres.Count == 0) return;

        _logger.LogInformation("==> {count} enchères commencées trouvées", startedEncheres.Count);

        using var scope = _services.CreateScope();
        var endpoint = scope.ServiceProvider.GetRequiredService<IPublishEndpoint>();

        foreach (var enchere in startedEncheres)
        {
            enchere.Started = true;
            await enchere.SaveAsync(null, stoppingToken);

            await endpoint.Publish(new EnchereStarted
            {
                AuctionId = enchere.ID,
                Seller = enchere.Seller
            }, stoppingToken);
        }
    }
}
