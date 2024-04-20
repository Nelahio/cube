using MongoDB.Entities;

namespace OffreService.Models;
public class Enchere : Entity
{
    public DateTime AuctionEnd { get; set; }
    public string Seller { get; set; }
    public int ReservePrice { get; set; }
    public bool Finished { get; set; }
}