namespace Contracts;

public class EnchereCreated
{
    public Guid Id { get; set; }
    public int ReservePrice { get; set; }
    public string Seller { get; set; }
    public string Winner { get; set; }
    public int SoldAmount { get; set; }
    public int CurrentHighBid { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public DateTime AuctionStart { get; set; }
    public DateTime AuctionEnd { get; set; }
    public string Statut { get; set; }
    public string Make { get; set; }
    public string Name { get; set; }
    public int Year { get; set; }
    public string Color { get; set; }
    public string Category { get; set; }
    public string State { get; set; }
    public string Description { get; set; }
    public string ImageUrl { get; set; }
}
