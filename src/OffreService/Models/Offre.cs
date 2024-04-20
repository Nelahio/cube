namespace OffreService.Models;

public class Offre
{
    public string AuctionId { get; set; }
    public string Bidder { get; set; }
    public DateTime BidDate { get; set; } = DateTime.UtcNow;
    public int Amount { get; set; }
    public OffreStatut BidStatus { get; set; }
}
