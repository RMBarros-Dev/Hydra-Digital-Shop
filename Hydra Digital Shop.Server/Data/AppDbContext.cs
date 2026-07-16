using System;
using Microsoft.EntityFrameworkCore;

namespace HydraDigitalShop.Server.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Game> Games { get; set; } = null!;
    public DbSet<Order> Orders { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Game>(b =>
        {
            b.HasKey(g => g.Id);
            b.Property(g => g.Price).HasColumnType("decimal(18,2)");
        });

        modelBuilder.Entity<Order>(b =>
        {
            b.HasKey(o => o.Id);
            b.Property(o => o.TotalPrice).HasColumnType("decimal(18,2)");
        });

        // Seed data - same games as frontend mock
        modelBuilder.Entity<Game>().HasData(
            new Game
            {
                Id = Guid.Parse("11111111-1111-1111-1111-111111111111"),
                Title = "Elden Ring",
                Description = "A massive world to explore. High difficulty, rich lore and epic boss battles.",
                Price = 179.99m,
                ImageUrl = "https://images.unsplash.com/photo-1605902711622-cfb43c44367f?auto=format&fit=crop&w=800&q=60",
                Category = "RPG",
                Discount = 20,
                Platform = "Windows"
            },
            new Game
            {
                Id = Guid.Parse("22222222-2222-2222-2222-222222222222"),
                Title = "Red Dead Redemption 2",
                Description = "Western epic with a cinematic single-player campaign and online modes.",
                Price = 129.99m,
                ImageUrl = "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=800&q=60",
                Category = "Ação",
                Discount = 35,
                Platform = "Windows"
            },
            new Game
            {
                Id = Guid.Parse("33333333-3333-3333-3333-333333333333"),
                Title = "FIFA Ultimate 24",
                Description = "Última edição do sim de futebol, jogabilidade refinada e modos online.",
                Price = 249.99m,
                ImageUrl = "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=800&q=60",
                Category = "Esporte",
                Discount = 10,
                Platform = "Windows"
            },
            new Game
            {
                Id = Guid.Parse("44444444-4444-4444-4444-444444444444"),
                Title = "Forza Horizon 5",
                Description = "Corridas em mundo aberto com centenas de carros e clima dinâmico.",
                Price = 199.99m,
                ImageUrl = "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?auto=format&fit=crop&w=800&q=60",
                Category = "Corrida",
                Discount = 15,
                Platform = "Windows"
            },
            new Game
            {
                Id = Guid.Parse("55555555-5555-5555-5555-555555555555"),
                Title = "Civilization VI",
                Description = "Estratégia por turnos com gestão de impérios e diplomacia profunda.",
                Price = 79.99m,
                ImageUrl = "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=60",
                Category = "Estratégia",
                Discount = 50,
                Platform = "Windows"
            },
            new Game
            {
                Id = Guid.Parse("66666666-6666-6666-6666-666666666666"),
                Title = "Microsoft Flight Simulator",
                Description = "Simulação de voo hiper-realista com mapeamento global.",
                Price = 299.99m,
                ImageUrl = "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=800&q=60",
                Category = "Simulação",
                Discount = 5,
                Platform = "Windows"
            }
        );
    }
}

public class Game
{
    public Guid Id { get; set; }
    public string Title { get; set; } = null!;
    public string? Description { get; set; }
    public decimal Price { get; set; }
    public string? ImageUrl { get; set; }
    public string? Category { get; set; }
    public int? Discount { get; set; }
    public string? Platform { get; set; }
    public string? ActivationKey { get; set; }
}

public class Order
{
    public Guid Id { get; set; }
    public string? CustomerEmail { get; set; }
    public DateTime OrderDate { get; set; }
    public decimal TotalPrice { get; set; }
    public string? ActivationKeysJson { get; set; }
}
