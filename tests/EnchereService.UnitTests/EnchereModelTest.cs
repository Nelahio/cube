using EnchereService.Models;

namespace EnchereService.UnitTests;

public class EnchereModelTest
{
    [Fact]
    public void HasReservePrice_HasReservePriceGtZero_True()
    {
        // Arrange
        var enchere = new Enchere
        {
            Id = Guid.NewGuid(),
            ReservePrice = 10
        };

        // Act
        var result = enchere.HasReservePrice();

        // Assert
        Assert.True(result);
    }

    [Fact]
    public void HasReservePrice_HasReservePriceIsZero_False()
    {
        // Arrange
        var enchere = new Enchere
        {
            Id = Guid.NewGuid(),
            ReservePrice = 0
        };

        // Act
        var result = enchere.HasReservePrice();

        // Assert
        Assert.False(result);
    }
}