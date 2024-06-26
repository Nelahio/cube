﻿using System.ComponentModel.DataAnnotations.Schema;

namespace EnchereService.Models;

[Table("Items")]
public class Produit
{
    public Guid Id { get; set; }
    public string Make { get; set; }
    public string Name { get; set; }
    public int Year { get; set; }
    public string Color { get; set; }
    public string Description { get; set; }
    public string ImageUrl { get; set; }
    public string Category { get; set; }
    public Etat State { get; set; }
    public Enchere Auction { get; set; }
    public Guid AuctionId { get; set; }
}
