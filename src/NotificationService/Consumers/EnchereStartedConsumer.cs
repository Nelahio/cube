using Contracts;
using MassTransit;
using Microsoft.AspNetCore.SignalR;
using NotificationService.Hubs;

namespace NotificationService.Consumers;

public class EnchereStartedConsumer : IConsumer<EnchereStarted>
{
    private readonly IHubContext<NotificationHub> _hubContext;

    public EnchereStartedConsumer(IHubContext<NotificationHub> hubContext)
    {
        _hubContext = hubContext;
    }
    public async Task Consume(ConsumeContext<EnchereStarted> context)
    {
        Console.WriteLine("--> auction started message received");

        await _hubContext.Clients.All.SendAsync("EnchereStarted", context.Message);
    }
}
