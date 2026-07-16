using System;
using System.Collections.Generic;

namespace HydraDigitalShop.Server.Data;

public record CartItemDto(Guid GameId, int Quantity);
public record CheckoutRequest(List<CartItemDto> Items, string? CustomerEmail);
public record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
