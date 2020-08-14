using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WaterMango.Model;
using Microsoft.AspNetCore.SignalR;

namespace WaterMango.Hubs
{
    public class MessageHub:Hub
    {
        public async Task SendMessage(Plant msg)
        {
            await Clients.All.SendAsync("MessageReceived", msg);
        }
    }
}
