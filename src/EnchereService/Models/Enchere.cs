namespace EnchereService.Models;

public class Enchere
{
    public Guid Id { get; set; }
    public int ReservePrice { get; set; }
    public string Seller { get; set; }
    public string Winner { get; set; }
    public int? SoldAmount { get; set; }
    public int? CurrentHighBid { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    public DateTime AuctionStart { get; set; }
    public DateTime AuctionEnd { get; set; }
    public Statut Status { get; set; }
    public Produit Item { get; set; }

    public bool HasReservePrice() => ReservePrice > 0;
}

