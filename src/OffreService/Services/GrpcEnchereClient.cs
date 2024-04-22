using EnchereService;
using Grpc.Net.Client;
using OffreService.Models;

namespace OffreService.Services;

public class GrpcEnchereClient
{
    private readonly ILogger<GrpcEnchereClient> _logger;
    private readonly IConfiguration _config;

    public GrpcEnchereClient(ILogger<GrpcEnchereClient> logger, IConfiguration config)
    {
        _logger = logger;
        _config = config;
    }

    public Enchere GetEnchere(string id)
    {
        _logger.LogInformation("Appel du service gRPC");
        var channel = GrpcChannel.ForAddress(_config["GrpcEnchere"]);
        var client = new GrpcEnchere.GrpcEnchereClient(channel);
        var request = new GetEnchereRequest { Id = id };

        try
        {
            var reply = client.GetEnchere(request);
            var enchere = new Enchere
            {
                ID = reply.Enchere.Id,
                AuctionEnd = DateTime.Parse(reply.Enchere.AuctionEnd),
                Seller = reply.Enchere.Seller,
                ReservePrice = reply.Enchere.ReservePrice
            };

            return enchere;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Impossible d'appeler le serveur gRPC");
            return null;
        }
    }
}
