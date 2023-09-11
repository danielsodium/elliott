const { SlashCommandBuilder } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('rides')
		.setDescription('For church rides'),
	async execute(interaction) {
		if (interaction.member.roles.cache.has('962909363004117102')) {
			const message = await interaction.reply({
				content: "React with the appropriate church emoji if you would like a ride to that church this Sunday." ,
				fetchReply : true
			});
			message.react('1149706006184599603');
			message.react('1149705966493904906');
		}	
		else {
			interaction.reply("The ability to speak does not make you intelligent.")	
		}
	}
}