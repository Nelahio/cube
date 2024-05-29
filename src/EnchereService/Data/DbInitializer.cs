using EnchereService.Models;
using Microsoft.EntityFrameworkCore;

namespace EnchereService.Data;

public class DbInitializer
{
    public static void InitDb(WebApplication app)
    {
        using var scope = app.Services.CreateScope();

        SeedData(scope.ServiceProvider.GetService<EnchereDbContext>());
    }

    private static void SeedData(EnchereDbContext context)
    {
        context.Database.Migrate();
        if (context.Auctions.Any())
        {
            Console.WriteLine("Données déjà présentes - pas besoin d'en ajouter");
            return;
        }

        //enchères
        var encheres = new List<Enchere>()
        {
            // 1 Parfum Lolita Lempicka Sweet
            new Enchere
            {
                Id = Guid.Parse("afbee524-5972-4075-8800-7d1f9d7b0a0c"),
                Status = Statut.Live,
                ReservePrice = 300,
                Seller = "bob",
                AuctionEnd = DateTime.UtcNow.AddDays(10),
                Item = new Produit
                {
                    Make = "Lolita Lempicka",
                    Name = "Sweet",
                    Color = "Rouge",
                    Year = 2020,
                    Description = "Eau de parfum 50ml",
                    ImageUrl = "https://www.lolitalempicka.com/cdn/shop/products/eShopSWEETBOTTLE30ml_1500x.jpg",
                    Category = "Parfum",
                    State = Etat.New
                }
            },

            // 2 Dior J'adore
            new Enchere
            {
                Id = Guid.Parse("c8c3ec17-01bf-49db-82aa-1ef80b833a9f"),
                Status = Statut.Live,
                ReservePrice = 500,
                Seller = "alice",
                AuctionEnd = DateTime.UtcNow.AddHours(8),
                Item = new Produit
                {
                    Make = "Dior",
                    Name = "J'adore",
                    Color = "Orange",
                    Year = 2020,
                    Description = "Eau de parfum 50ml",
                    ImageUrl = "https://www.dior.com/dw/image/v2/BGXS_PRD/on/demandware.static/-/Sites-master_dior/default/dw87e94e42/Y0715201/Y0715201_F071524009_E01_ZHC.jpg",
                    Category = "Parfum",
                    State = Etat.GoodCondition
                }
            },

            // 3 Nina Ricci Nina Rouge
            new Enchere
            {
                Id = Guid.Parse("bbab4d5a-8565-48b1-9450-5ac2a5c4a654"),
                Status = Statut.Live,
                Seller = "bob",
                AuctionEnd = DateTime.UtcNow.AddDays(4),
                Item = new Produit
                {
                    Make = "Nina Ricci",
                    Name = "Nina Extra Rouge",
                    Color = "Rouge",
                    Year = 2020,
                    Description = "Eau de parfum 80ml",
                    ImageUrl = "https://cdn.shopify.com/s/files/1/0604/7409/7823/products/SNR-8629-80ml.jpg",
                    Category = "Parfum",
                    State = Etat.GoodCondition
                }
            },

            // 4 Nina Ricci Illusion
            new Enchere
            {
                Id = Guid.Parse("155225c1-4448-4066-9886-6786536e05ea"),
                Status = Statut.ReserveNotMet,
                ReservePrice = 200,
                Seller = "alice",
                AuctionEnd = DateTime.UtcNow.AddDays(4),
                Item = new Produit
                {
                    Make = "Nina Ricci",
                    Name = "Illusion",
                    Color = "Rose",
                    Year = 2020,
                    Description = "Eau de parfum 30ml",
                    ImageUrl = "https://cdn.shopify.com/s/files/1/0604/7409/7823/files/76650f76-13f3-4316-b44f-d3adf5ef0b4e_Nina-Illusion-80ml-FACE.jpg",
                    Category = "Parfum",
                    State = Etat.GoodCondition
                }
            },

            // 5 Nina Ricci L'Air du Temps
            new Enchere
            {
                Id = Guid.Parse("466e4744-4dc5-4987-aae0-b621acfc5e39"),
                Status = Statut.Live,
                ReservePrice = 200,
                Seller = "alice",
                AuctionEnd = DateTime.UtcNow.AddDays(2),
                Item = new Produit
                {
                    Make = "Nina Ricci",
                    Name = "L'Air du Temps X Anne Brun",
                    Color = "Blanc",
                    Year = 2020,
                    Description = "Eau de parfum 100ml",
                    ImageUrl = "https://cdn.shopify.com/s/files/1/0604/7409/7823/files/FLACON_ADT_5000x5000_6377f62a-2b9e-4783-8383-274d210cdee8.jpg",
                    Category = "Parfum",
                    State = Etat.New
                }
            },

            // 6 Paco Rabanne Invictus
            new Enchere
            {
                Id = Guid.Parse("dc1e4071-d19d-459b-b848-b5c3cd3d151f"),
                Status = Statut.Live,
                ReservePrice = 200,
                Seller = "bob",
                AuctionEnd = DateTime.UtcNow.AddHours(2),
                Item = new Produit
                {
                    Make = "Paco Rabanne",
                    Name = "Invictus",
                    Color = "Bleu",
                    Year = 2016,
                    Description = "Eau de parfum 100ml",
                    ImageUrl = "https://medias.rabanne.com/medias/sys_master/images/h1d/h71/9905979457566/9905979392030/9905979392030.jpg",
                    Category = "Parfum",
                    State = Etat.New
                }
            },

            // 7 Dior Miss Dior
            new Enchere
            {
                Id = Guid.Parse("47111973-d176-4feb-848d-0ea22641c31a"),
                Status = Statut.Live,
                ReservePrice = 200,
                Seller = "bob",
                AuctionEnd = DateTime.UtcNow.AddDays(5),
                Item = new Produit
                {
                    Make = "Dior",
                    Name = "Miss Dior",
                    Color = "Rose",
                    Year = 2020,
                    Description = "Eau de parfum 50ml",
                    ImageUrl = "https://www.dior.com/dw/image/v2/BGXS_PRD/on/demandware.static/-/Sites-master_dior/default/dwb75065e2/Y0997166/Y0997166_C099700897_E01_ZHC.jpg",
                    Category = "Parfum",
                    State = Etat.GoodCondition
                }
            },

            // 8 Dior Sauvage
            new Enchere
            {
                Id = Guid.Parse("6a5011a1-fe1f-47df-9a32-b5346b289391"),
                Status = Statut.Live,
                Seller = "bob",
                AuctionEnd = DateTime.UtcNow.AddDays(3),
                Item = new Produit
                {
                    Make = "Dior",
                    Name = "Sauvage",
                    Color = "Bleu",
                    Year = 2020,
                    Description = "Eau de parfum 50ml",
                    ImageUrl = "https://www.dior.com/dw/image/v2/BGXS_PRD/on/demandware.static/-/Sites-master_dior/default/dw29653516/Y0785220/Y0785220_F078524009_E01_ZHC.jpg",
                    Category = "Parfum",
                    State = Etat.LikeNew
                }
            },

            // 9 Dior Hypnotic Poison
            new Enchere
            {
                Id = Guid.Parse("40490065-dac7-46b6-acc4-df507e0d6570"),
                Status = Statut.Live,
                ReservePrice = 400,
                Seller = "alice",
                AuctionEnd = DateTime.UtcNow.AddHours(10),
                Item = new Produit
                {
                    Make = "Dior",
                    Name = "Hypnotic Poison",
                    Color = "Rouge",
                    Year = 2020,
                    Description = "Eau de parfum 50ml",
                    ImageUrl = "https://www.dior.com/dw/image/v2/BGXS_PRD/on/demandware.static/-/Sites-master_dior/default/dwb3c99548/Y0083424/Y0083424_F008342409_E01_ZHC.jpg",
                    Category = "Parfum",
                    State = Etat.LikeNew
                }
            },

            // 10 Dolce & Gabbana The One
            new Enchere
            {
                Id = Guid.Parse("3659ac24-29dd-407a-81f5-ecfe6f924b9b"),
                Status = Statut.Live,
                ReservePrice = 100,
                Seller = "bob",
                AuctionEnd = DateTime.UtcNow.AddHours(5),
                Item = new Produit
                {
                    Make = "Dolce & Gabbana",
                    Name = "The One for Men",
                    Color = "Orange",
                    Year = 2020,
                    Description = "Eau de parfum 50ml",
                    ImageUrl = "https://www.nocibe.fr/fstrz/r/s/www.nocibe.fr/medias/produits/205146/205146-dolce-gabbana-the-one-men-eau-de-parfum-vaporisateur-150-ml-1000x1000.jpg",
                    Category = "Parfum",
                    State = Etat.Worn
                }
            }
        };

        context.AddRange(encheres);
        context.SaveChanges();
    }
}
