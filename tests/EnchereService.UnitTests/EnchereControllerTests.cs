using AutoMapper;
using Contracts;
using EnchereService.Controllers;
using EnchereService.Data;
using EnchereService.DTOs;
using EnchereService.Models;
using MassTransit;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Xunit;

namespace EnchereService.UnitTests;

public class EnchereControllerTests
{
    private readonly EnchereDbContext _context;
    private readonly Mock<IMapper> _mockMapper;
    private readonly Mock<IPublishEndpoint> _mockPublishEndpoint;
    private readonly EncheresController _controller;

    public EnchereControllerTests()
        {
            var options = new DbContextOptionsBuilder<EnchereDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

            _context = new EnchereDbContext(options);
            _mockMapper = new Mock<IMapper>();
            _mockPublishEndpoint = new Mock<IPublishEndpoint>();
            _controller = new EncheresController(_context, _mockMapper.Object, _mockPublishEndpoint.Object);
        }

    [Fact]
        public async Task GetAllEncheres_ReturnsListOfEnchereDto()
        {
            // Arrange
            var date = "2023-07-01";
            var auctions = new List<Enchere>
            {
                new Enchere { Id = Guid.NewGuid(), UpdatedAt = DateTime.UtcNow.AddDays(-1), Item = new Produit { Make = "Make1" } },
                new Enchere { Id = Guid.NewGuid(), UpdatedAt = DateTime.UtcNow, Item = new Produit { Make = "Make2" } }
            };
            
            _context.Auctions.AddRange(auctions);
            await _context.SaveChangesAsync();

            var configurationProvider = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<Enchere, EnchereDto>();
            });

            var mapper = configurationProvider.CreateMapper();
            _mockMapper.Setup(m => m.ConfigurationProvider).Returns(mapper.ConfigurationProvider);

            // Act
            var result = await _controller.GetAllEncheres(date);

            // Assert
            var actionResult = Assert.IsType<ActionResult<List<EnchereDto>>>(result);
            var returnValue = Assert.IsType<List<EnchereDto>>(actionResult.Value);
            Assert.Equal(2, returnValue.Count);
        }

        [Fact]
        public async Task GetEnchereById_ReturnsEnchereDto()
        {
            // Arrange
            var enchereId = Guid.NewGuid();
            var enchere = new Enchere { Id = enchereId, Item = new Produit { Make = "Make1" } };

            _context.Auctions.Add(enchere);
            await _context.SaveChangesAsync();

            _mockMapper.Setup(m => m.Map<EnchereDto>(It.IsAny<Enchere>())).Returns(new EnchereDto { Id = enchereId });

            // Act
            var result = await _controller.GetEnchereById(enchereId);

            // Assert
            var actionResult = Assert.IsType<ActionResult<EnchereDto>>(result);
            var returnValue = Assert.IsType<EnchereDto>(actionResult.Value);
            Assert.Equal(enchereId, returnValue.Id);
        }

        [Fact]
        public async Task PostEnchere_ReturnsCreatedAtAction()
        {
            // Arrange
            var enchereDto = new CreateEnchereDto { };
            var enchere = new Enchere { Id = Guid.NewGuid(), Seller = "testuser" };

            _mockMapper.Setup(m => m.Map<Enchere>(enchereDto)).Returns(enchere);
            _mockMapper.Setup(m => m.Map<EnchereDto>(enchere)).Returns(new EnchereDto { Id = enchere.Id });
            _mockMapper.Setup(m => m.Map<EnchereCreated>(It.IsAny<EnchereDto>())).Returns(new EnchereCreated { Id = Guid.Parse(enchere.Id.ToString()) });

            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Name, "testuser")
            }, "mock"));

            _controller.ControllerContext = new ControllerContext
            {
                HttpContext = new DefaultHttpContext { User = user }
            };

            // Act
            var result = await _controller.PostEnchere(enchereDto);

            // Assert
            var actionResult = Assert.IsType<ActionResult<EnchereDto>>(result);
            var createdAtActionResult = Assert.IsType<CreatedAtActionResult>(actionResult.Result);
            var returnValue = Assert.IsType<EnchereDto>(createdAtActionResult.Value);
            Assert.Equal(enchere.Id, returnValue.Id);
        }

        [Fact]
        public async Task PutEnchere_ReturnsOk()
        {
            // Arrange
            var enchereId = Guid.NewGuid();
            var updateEnchereDto = new UpdateEnchereDto { Make = "UpdatedMake" };
            var enchere = new Enchere { Id = enchereId, Seller = "testuser", Item = new Produit { Make = "Make1" } };

            _context.Auctions.Add(enchere);
            await _context.SaveChangesAsync();

            _mockMapper.Setup(m => m.Map<EnchereUpdated>(It.IsAny<Enchere>())).Returns(new EnchereUpdated { Id = enchereId.ToString() });

            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Name, "testuser")
            }, "mock"));

            _controller.ControllerContext = new ControllerContext
            {
                HttpContext = new DefaultHttpContext { User = user }
            };

            // Act
            var result = await _controller.PutEnchere(enchereId, updateEnchereDto);

            // Assert
            Assert.IsType<OkResult>(result);
        }

        [Fact]
        public async Task DeleteEnchere_ReturnsOk()
        {
            // Arrange
            var enchereId = Guid.NewGuid();
            var enchere = new Enchere { Id = enchereId, Seller = "testuser" };

            _context.Auctions.Add(enchere);
            await _context.SaveChangesAsync();

            _mockPublishEndpoint.Setup(p => p.Publish(It.IsAny<EnchereDeleted>(), default));

            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Name, "testuser")
            }, "mock"));

            _controller.ControllerContext = new ControllerContext
            {
                HttpContext = new DefaultHttpContext { User = user }
            };

            // Act
            var result = await _controller.DeleteEnchere(enchereId);

            // Assert
            Assert.IsType<OkResult>(result);
        }
}
