const { SlashCommandBuilder } = require('discord.js');

// Fresh from the overflow
function nextDay(x){
    var now = new Date();    
    now.setDate(now.getDate() + (x+(7-now.getDay())) % 7);
    return now;
}


module.exports = {
	data: new SlashCommandBuilder()
		.setName('rides')
		.setDescription('For church rides'),
	async execute(interaction) {
		if (interaction.member.roles.cache.has('962909363004117102')) {


			
			let graceEmbed =  {
				color: 0xFA9A2C,
				title: `Grace Fellowship Rides - ${nextDay(7).toLocaleDateString()}`, 
				description: 'React with the service time if you would like a ride this Sunday. DM <@393100219102789632> or <@464165717907079178> if you would like to be picked up from somewhere other than the union.',
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

			const grace = await interaction.reply({
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

		}	
		else {
			interaction.reply("The ability to speak does not make you intelligent.")	
		}
	}
}