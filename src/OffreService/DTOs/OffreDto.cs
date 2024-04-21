using OffreService.Models;

namespace OffreService.DTOs;

public class OffreDto
{
    public string Id { get; set; }
    public string AuctionId { get; set; }
    public string Bidder { get; set; }
    public DateTime BidTime { get; set; } = DateTime.UtcNow;
    public int Amount { get; set; }
    public OffreStatut BidStatus { get; set; }
}
