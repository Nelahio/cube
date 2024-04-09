using EnchereService.Models;
using MassTransit;
using Microsoft.EntityFrameworkCore;

namespace EnchereService.Data;

public class EnchereDbContext : DbContext
{
    public EnchereDbContext(DbContextOptions options) : base(options)
    {
    }

    public DbSet<Enchere> Auctions { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.AddInboxStateEntity();
        modelBuilder.AddOutboxMessageEntity();
        modelBuilder.AddOutboxStateEntity();
    }
}
