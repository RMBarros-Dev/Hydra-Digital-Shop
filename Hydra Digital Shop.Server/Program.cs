using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using HydraDigitalShop.Server.Data;

namespace HydraDigitalShop.Server;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add service defaults & Aspire client integrations.
        builder.AddServiceDefaults();

        // Use in-memory distributed cache instead of Redis (no Docker required)
        builder.Services.AddDistributedMemoryCache();
        // Register output caching (uses the in-memory cache)
        builder.Services.AddOutputCache();

        // Add services to the container.
        builder.Services.AddProblemDetails();

        // Configure EF Core with SQL Server
        builder.Services.AddDbContext<AppDbContext>(options =>
            options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

        // Configure CORS to allow front-end (Vite) during development
        var frontendUrl = builder.Configuration["VITE_API_URL"] ?? "http://localhost:5173";
        builder.Services.AddCors(o => o.AddPolicy("AllowFrontend", p => p
            .WithOrigins(frontendUrl)
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials()
        ));

        // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
        builder.Services.AddOpenApi();

        var app = builder.Build();

        // Ensure database is created and seeded
        using (var scope = app.Services.CreateScope())
        {
            var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            db.Database.EnsureCreated();
        }

        // Configure the HTTP request pipeline.
        app.UseExceptionHandler();

        if (app.Environment.IsDevelopment())
        {
            app.MapOpenApi();
        }

        app.UseOutputCache();
        app.UseCors("AllowFrontend");

        string[] summaries = new[] { "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching" };

        var api = app.MapGroup("/api");

        api.MapGet("weatherforecast", () =>
        {
            var forecast = Enumerable.Range(1, 5).Select(index =>
                new Data.WeatherForecast
                (
                    DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                    Random.Shared.Next(-20, 55),
                    summaries[Random.Shared.Next(summaries.Length)]
                ))
                .ToArray();
            return forecast;
        })
        .CacheOutput(p => p.Expire(TimeSpan.FromSeconds(5)))
        .WithName("GetWeatherForecast");

        // List games from database
        api.MapGet("games", async (AppDbContext db) => await db.Games.ToListAsync())
            .WithName("GetGames");

        // Checkout endpoint - receives items and creates an order with activation keys
        api.MapPost("checkout", async (AppDbContext db, Data.CheckoutRequest req) =>
        {
            if (req.Items == null || req.Items.Count == 0)
                return Results.BadRequest(new { error = "No items provided" });

            if (req.Items.Any(item => item.Quantity <= 0))
                return Results.BadRequest(new { error = "Item quantities must be greater than zero" });

            var ids = req.Items.Select(i => i.GameId).ToList();
            var games = await db.Games.Where(g => ids.Contains(g.Id)).ToListAsync();

            var purchased = new List<object>();
            decimal total = 0m;

            foreach (var item in req.Items)
            {
                var g = games.FirstOrDefault(x => x.Id == item.GameId);
                if (g == null) continue;

                total += CheckoutPricing.CalculateLineTotal(g.Price, g.Discount, item.Quantity);

                for (int q = 0; q < item.Quantity; q++)
                {
                    var key = GenerateActivationKey();
                    purchased.Add(new { GameId = g.Id, Title = g.Title, Key = key });
                }
            }

            var order = new Order
            {
                Id = Guid.NewGuid(),
                CustomerEmail = req.CustomerEmail,
                OrderDate = DateTime.UtcNow,
                TotalPrice = total,
                ActivationKeysJson = JsonSerializer.Serialize(purchased)
            };

            db.Orders.Add(order);
            await db.SaveChangesAsync();

            return Results.Ok(new { order.Id, Purchased = purchased });
        }).WithName("Checkout");

        app.MapDefaultEndpoints();

        app.UseFileServer();

        app.Run();
    }

    static string GenerateActivationKey()
    {
        string Part() => Guid.NewGuid().ToString("N").Substring(0, 4).ToUpper();
        return $"HYDRA-{Part()}-{Part()}-{Part()}";
    }
}
