using EnchereService.Data;
using Grpc.Core;

namespace EnchereService.Services;

public class GrpcEnchereService : GrpcEnchere.GrpcEnchereBase
{
    private readonly EnchereDbContext _dbContext;

    public GrpcEnchereService(EnchereDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public override async Task<GrpcEnchereResponse> GetEnchere(GetEnchereRequest request, ServerCallContext context)
    {
        Console.WriteLine("==> Requête gRPC reçue pour une enchère");

        var enchere = await _dbContext.Auctions.FindAsync(Guid.Parse(request.Id))
            ?? throw new RpcException(new Status(StatusCode.NotFound, "Not found"));

        var response = new GrpcEnchereResponse
        {
            Enchere = new GrpcEnchereModel
            {
                AuctionEnd = enchere.AuctionEnd.ToString(),
                Id = enchere.Id.ToString(),
                ReservePrice = enchere.ReservePrice,
                Seller = enchere.Seller,
            }
        };

        return response;
    }
}
