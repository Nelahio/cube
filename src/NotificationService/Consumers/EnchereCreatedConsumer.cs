using Contracts;
using MassTransit;
using Microsoft.AspNetCore.SignalR;
using NotificationService.Hubs;

namespace NotificationService.Consumers;

public class EnchereCreatedConsumer : IConsumer<EnchereCreated>
{
    private readonly IHubContext<NotificationHub> _hubContext;

    public EnchereCreatedConsumer(IHubContext<NotificationHub> hubContext)
    {
        _hubContext = hubContext;
    }
    public async Task Consume(ConsumeContext<EnchereCreated> context)
    {
        Console.WriteLine("--> auction created message received");

        await _hubContext.Clients.User(context.Message.Seller).SendAsync("EnchereCreated", context.Message);
    }
}
