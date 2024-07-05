using System.ComponentModel.DataAnnotations;

namespace EnchereService.DTOs;

public class CreateEnchereDto
{
    [Required]
    public string Make { get; set; }
    [Required]
    public string Name { get; set; }
    [Required]
    public int Year { get; set; }
    [Required]
    public string Color { get; set; }
    [Required]
    public string Description { get; set; }
    [Required]
    public string ImageUrl { get; set; }
    [Required]
    public string Category { get; set; }
    [Required]
    public int ReservePrice { get; set; }
    [Required]
    public string State { get; set; }
    [Required]
    public DateTime AuctionStart { get; set; }
    [Required]
    public DateTime AuctionEnd { get; set; }
}
