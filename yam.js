
const { Client, Collection, Events, GatewayIntentBits, ActivityType } = require('discord.js');

const handler = async(event) => {
    const client = new Client({ intents: [GatewayIntentBits.Guilds] });

    client.commands = new Collection();
    client.once(Events.ClientReady, () => {
        console.log('Outputting Church Rides!');
        client.user.setActivity('the holy spirit', { type: ActivityType.Listening });
        const channel = client.channels.cache.get('1149706117451100201');
        sendRides(channel);

    });

    client.login("MTE0MjUzMzAxMjM1ODE4NTAxMA.GrYS3S.ItnqKg0uYTC2zi6fp3pv05t-jWgtdIOhQsbI9k")


}

// Fresh from the overflow
function nextDay(x){
    var now = new Date();    
    now.setDate(now.getDate() + (x+(7-now.getDay())) % 7);
    return now;
}

async function sendRides(channel) {

			let graceEmbed =  {
				color: 0xff4400,
				title: `YAM @ Grace Fellowship Rides - ${nextDay(1).toLocaleDateString()}`, 
				description: 'React with the emoji if you would like a ride to the young adult ministry (YAM) at Grace Fellowship this Monday at 6:45 at the Union Horseshoe.',
				thumbnail: {
					url: 'https://cdn.discordapp.com/attachments/860634794589028384/1152259497524482198/yam.png'
				},
				timestamp: nextDay(1).toISOString(),
				footer: {
					text: 'Monday',
				},
			};

			const grace = await channel.send({
				embeds: [graceEmbed],
				fetchReply : true
			});

			grace.react('1149706006184599603');
}

handler();
