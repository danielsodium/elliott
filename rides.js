
import { Client, Collection, Events, GatewayIntentBits, ActivityType } from 'discord.js';

export const handler = async(event) => {
    const client = new Client({ intents: [GatewayIntentBits.Guilds] });

    client.commands = new Collection();
    client.once(Events.ClientReady, () => {
        console.log('Outputting Church Rides!');
        client.user.setActivity('the holy spirit', { type: ActivityType.Listening });
        const channel = client.channels.cache.get('1165459970947567647');
        sendRides(channel);

    });

    client.login("MTE0MjUzMzAxMjM1ODE4NTAxMA.GdxHIj.GO6RLaVVkMZ_NAisVoe7Uc34KMcpHzSbO2hKeo");


}
// Fresh from the overflow
function nextDay(x){
    var now = new Date();    
    now.setDate(now.getDate() + (x+(7-now.getDay())) % 7);
    return now;
}

async function sendRides(channel) {
    let graceEmbed =  {
        color: 0xFA9A2C,
        title: `Grace Fellowship Rides - ${nextDay(7).toLocaleDateString()}`, 
        description: 'React with the service time if you would like a ride this Sunday. DM <@436712282073071616> or <@464165717907079178> if you would like to be picked up from somewhere other than the union.',
        thumbnail: {
            url: 'https://cdn.discordapp.com/attachments/860634794589028384/1151893750646317137/grace.png'
        },
        fields: [
            {
                name: '9️⃣ : 9 AM',
                value: ''
            },
            {
                name: '⏸️ : 11 AM',
                value: ''
            }
        ],
        timestamp: nextDay(7).toISOString(),
        footer: {
            text: 'Sunday',
        },
    };

    const grace = await channel.send({
        embeds: [graceEmbed],
        fetchReply : true
    });
    grace.react('9️⃣');
    grace.react('⏸️');			
    let terraEmbed =  {
        color: 0x414047,
        title: `Terra Nova Rides - ${nextDay(7).toLocaleDateString()}`, 
        description: 'React with the emoji if you woud like a ride this Sunday. DM <@331579355194982420> if you would like to be picked up from somewhere other than the union.',
        thumbnail: {
            url: 'https://cdn.discordapp.com/attachments/860634794589028384/1151892810803458068/terra.jpg'
        },
        timestamp: nextDay(7).toISOString(),
        footer: {
            text: 'Sunday',
        },
    };


    const terra = await grace.reply({
        embeds: [terraEmbed],
        fetchReply : true
    });
    terra.react('1149705966493904906');

    let praiseEmbed = { 
        color: 0xcccccc,
        title: `House of Praise Rides - ${nextDay(7).toLocaleDateString()}`, 
        description: 'React with the emoji if you woud like a ride this Sunday to House Of Praise Church. DM <@819278303278006302> for pickup time and location.',
        thumbnail: {
            url: 'https://cdn.discordapp.com/attachments/860634794589028384/1158490589730451528/324847723_5526450310799179_6865450617495667428_n.png?ex=651c6ff0&is=651b1e70&hm=62734f2393df41c356b68069ab5bcb2dee21bc763006c1f333c3e8d55beca8cc&'
        },
        timestamp: nextDay(7).toISOString(),
        footer: {
            text: 'Sunday',
        },
    };
    const praise = await terra.reply({
        embeds: [praiseEmbed],
        fetchReply:true
    })
    praise.react('1163520284784066820')
}

