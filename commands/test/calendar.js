const { SlashCommandBuilder, GuildScheduledEventManager, GuildScheduledEventPrivacyLevel, GuildScheduledEventEntityType } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('events')
		.setDescription('Update the events'),
		async execute(interaction) {
			const guildID = '680248822194372657';
			const guild = await interaction.client.guilds.fetch(guildID);
			
			if (!guild)
			  return console.log('Guild not found');
		
			const event_manager = new GuildScheduledEventManager(guild);
			var date = new Date();
			date.setDate(30)
			var end = new Date();
			date.setDate(31)
			console.log(date)
			await event_manager.create({
			  name: 'Test Event',
			  scheduledStartTime: date.toDateString(), 
			  scheduledEndTime: end.toDateString(), 
			  privacyLevel: GuildScheduledEventPrivacyLevel.GuildOnly,
			  entityType: GuildScheduledEventEntityType.External,
			  entityMetadata:{
				location: "Union"
			  },
			  description: 'This is a test Scheduled Event',
			  reason: 'Testing with creating a Scheduled Event',
			});
		  },	
};;