const { SlashCommandBuilder } = require('discord.js');

// Fresh from the overflow
function nextDay(x){
    var now = new Date();    
    now.setDate(now.getDate() + (x+(7-now.getDay())) % 7);
    return now;
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('yam')
		.setDescription('For yam rides'),
	async execute(interaction) {
		if (interaction.member.roles.cache.has('962909363004117102')) {

			let graceEmbed =  {
				color: 0xff4400,
				title: `YAM @ Grace Fellowship Rides - ${nextDay(1).toLocaleDateString()}`, 
				description: 'React with the emoji if you would like a ride to the young adult ministry (YAM) at Grace Fellowship this Monday at 6:45 at the Union Horseshoe. DM <@819278303278006302> if you would like to be picked up from somewhere other than the union.',
				thumbnail: {
					url: 'https://cdn.discordapp.com/attachments/860634794589028384/1152259497524482198/yam.png'
				},
				timestamp: nextDay(1).toISOString(),
				footer: {
					text: 'Monday',
				},
			};

			const grace = await interaction.reply({
				embeds: [graceEmbed],
				fetchReply : true
			});

			grace.react('1149706006184599603');

		}	
		else {
			interaction.reply("The ability to speak does not make you intelligent.")	
		}
	}
}