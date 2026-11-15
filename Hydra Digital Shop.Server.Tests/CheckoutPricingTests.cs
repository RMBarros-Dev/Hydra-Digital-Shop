using HydraDigitalShop.Server.Data;
using Xunit;

namespace HydraDigitalShop.Server.Tests;

public class CheckoutPricingTests
{
    [Theory]
    [InlineData(100, null, 100)]
    [InlineData(100, 0, 100)]
    [InlineData(100, 25, 75)]
    [InlineData(199.99, 50, 99.995)]
    [InlineData(80, 100, 0)]
    public void CalculateUnitPrice_AppliesDiscount(decimal price, int? discount, decimal expected)
    {
        Assert.Equal(expected, CheckoutPricing.CalculateUnitPrice(price, discount));
    }

    [Fact]
    public void CalculateLineTotal_MultipliesDiscountedPriceByQuantity()
    {
        var total = CheckoutPricing.CalculateLineTotal(100m, 25, 2);
        Assert.Equal(150m, total);
    }

    [Fact]
    public void CalculateUnitPrice_RejectsNegativePrice()
    {
        Assert.Throws<ArgumentOutOfRangeException>(
            () => CheckoutPricing.CalculateUnitPrice(-1m, 0));
    }

    [Theory]
    [InlineData(-1)]
    [InlineData(101)]
    public void CalculateUnitPrice_RejectsDiscountOutsideRange(int discount)
    {
        Assert.Throws<ArgumentOutOfRangeException>(
            () => CheckoutPricing.CalculateUnitPrice(100m, discount));
    }

    [Theory]
    [InlineData(0)]
    [InlineData(-1)]
    public void CalculateLineTotal_RejectsNonPositiveQuantity(int quantity)
    {
        Assert.Throws<ArgumentOutOfRangeException>(
            () => CheckoutPricing.CalculateLineTotal(100m, 0, quantity));
    }
}
