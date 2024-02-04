
const { Client, Collection, Events, GatewayIntentBits, ActivityType } = require('discord.js');

// Fresh from the overflow
function nextDay(x){
    var now = new Date();    
    now.setDate(now.getDate() + (x+(7-now.getDay())) % 7);
    return now;
}

async function sendRides(channel) {
    let graceEmbed =  {
        color: 0xFA9A2C,
        title: `Cecil Bean Rally Rides - ${nextDay(7).toLocaleDateString()}`, 
        description: 'React if you would like a ride this Saturday at the Union.',
        timestamp: nextDay(6).toISOString(),
        footer: {
            text: 'Saturday',
        },
    };

    const grace = await channel.send({
        embeds: [graceEmbed],
        fetchReply : true
    });
    grace.react('9️⃣');
 }

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

    client.commands = new Collection();
    client.once(Events.ClientReady, () => {
        console.log('Outputting Church Rides!');
        client.user.setActivity('the holy spirit', { type: ActivityType.Listening });
        const channel = client.channels.cache.get('1149706117451100201');
        sendRides(channel);

    });

    client.login("MTE0MjUzMzAxMjM1ODE4NTAxMA.GrYS3S.ItnqKg0uYTC2zi6fp3pv05t-jWgtdIOhQsbI9k")


