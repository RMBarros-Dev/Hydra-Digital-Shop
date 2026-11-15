namespace HydraDigitalShop.Server.Data;

/// <summary>
/// Centraliza o cálculo dos valores de checkout para permitir validação independente.
/// </summary>
public static class CheckoutPricing
{
    public static decimal CalculateUnitPrice(decimal price, int? discountPercent)
    {
        if (price < 0)
            throw new ArgumentOutOfRangeException(nameof(price), "Price cannot be negative.");

        var discount = discountPercent ?? 0;
        if (discount is < 0 or > 100)
            throw new ArgumentOutOfRangeException(nameof(discountPercent), "Discount must be between 0 and 100.");

        return price * (100 - discount) / 100m;
    }

    public static decimal CalculateLineTotal(decimal price, int? discountPercent, int quantity)
    {
        if (quantity <= 0)
            throw new ArgumentOutOfRangeException(nameof(quantity), "Quantity must be greater than zero.");

        return CalculateUnitPrice(price, discountPercent) * quantity;
    }
}
