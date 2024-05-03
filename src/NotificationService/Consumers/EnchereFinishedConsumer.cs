using Contracts;
using MassTransit;
using Microsoft.AspNetCore.SignalR;
using NotificationService.Hubs;

namespace NotificationService.Consumers;

public class EnchereFinishedConsumer : IConsumer<EnchereFinished>
{
    private readonly IHubContext<NotificationHub> _hubContext;

    public EnchereFinishedConsumer(IHubContext<NotificationHub> hubContext)
    {
        _hubContext = hubContext;
    }
    public async Task Consume(ConsumeContext<EnchereFinished> context)
    {
        Console.WriteLine("--> auction finished message received");

        await _hubContext.Clients.All.SendAsync("EnchereFinished", context.Message);
    }
}
