using Contracts;
using MassTransit;
using Microsoft.AspNetCore.SignalR;
using NotificationService.Hubs;

namespace NotificationService.Consumers;

public class OffreCreatedConsumer : IConsumer<OffreCreated>
{
private readonly IHubContext<NotificationHub> _hubContext;

    public OffreCreatedConsumer(IHubContext<NotificationHub> hubContext)
    {
        _hubContext = hubContext;
    }
    public async Task Consume(ConsumeContext<OffreCreated> context)
    {
        Console.WriteLine("--> bid placed message received");

        await _hubContext.Clients.All.SendAsync("OffreCreated", context.Message);
    }
}
