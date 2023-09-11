const { SlashCommandBuilder } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		
		const message = await interaction.reply({
			content: 'Pong!',
			fetchReply : true
		});
		message.react('1149712770510626826');
		console.log(interaction)
	},
};;