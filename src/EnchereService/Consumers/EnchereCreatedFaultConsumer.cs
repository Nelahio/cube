using EnchereService.Contracts;
using MassTransit;

namespace EnchereService.Consumers;

public class EnchereCreatedFaultConsumer : IConsumer<Fault<EnchereCreated>>
{
    public async Task Consume(ConsumeContext<Fault<EnchereCreated>> context)
    {
        Console.WriteLine("--> Consuming faulty creation");

        var exception = context.Message.Exceptions.First();

        if (exception.ExceptionType == "System.ArgumentException")
        {
            context.Message.Message.Name = "FooBar";
            await context.Publish(context.Message.Message);
        }
        else
        {
            Console.WriteLine("Not an argument exception - update error dashboard somewhere");
        }
    }
}