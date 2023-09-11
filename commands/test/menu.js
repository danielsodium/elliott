const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

function sortData(hall) {
	var sorted = {};
	for (var k = 0; k < hall.length; k++) {

		sorted[hall[k].date.substring(0, 10)] = {};

		// Add to breakfast, lunch, or dinner
		for (var i = 0; i < hall[k].menuItems.length; i++) {
			if (!Object.hasOwn(sorted[hall[k].date.substring(0, 10)], hall[k].menuItems[i].meal)) {
				sorted[hall[k].date.substring(0, 10)][hall[k].menuItems[i].meal] = {};
			}

			if (!Object.hasOwn(sorted[hall[k].date.substring(0, 10)][hall[k].menuItems[i].meal], hall[k].menuItems[i].course)) {
				sorted[hall[k].date.substring(0, 10)][hall[k].menuItems[i].meal][hall[k].menuItems[i].course] = [];
			}

			sorted[hall[k].date.substring(0, 10)][hall[k].menuItems[i].meal][hall[k].menuItems[i].course].push(hall[k].menuItems[i].formalName);

		}
	}

	//console.log(sorted)
	return sorted;

}

function addZero(deg) {
	return ('0' + deg).slice(-2);
}
function today() {
	let date = new Date();
	let year = date.getFullYear();
	let day = ('0' + (date.getDate())).slice(-2);
	let month = ('0' + (date.getMonth() + 1)).slice(-2);

	return (year + "-" + month + "-" + day);
}
function generateLink() {

	let date = new Date();
	let year = date.getFullYear();
	let day = ('0' + (date.getDate() - 1)).slice(-2);
	let month = ('0' + (date.getMonth() + 1)).slice(-2);
	let plusNine, plusNineM;

	if (date.getDate() + 8 > daysInThisMonth()) {
		plusNine = ('0' + (date.getDate() + 8 - daysInThisMonth())).slice(-2);
		plusNineM = ('0' + (date.getMonth() + 2)).slice(-2);
	} else {
		plusNine = ('0' + (date.getDate() + 8)).slice(-2);
		plusNineM = month;
	}

	return `https://sodexoitzstorage.blob.core.windows.net/renderedmenu/1/${year}/${date.getMonth() + 1}/${date.getDate() - 1}/bite9daymenu/76929001/nomenuid-False-${year}-${month}-${day}-${year}-${plusNineM}-${plusNine}-en-US-auth-3.json`;

}

async function update() {

	return new Promise(async (resolve, reject) => {
		let link = generateLink();
		var response = await fetch(link);
		var menus = (await response.json()).menus;
		var halls = {};

		var date = new Date();
		halls.updated = today();

		for (var i = 0; i < menus.length; i++) {
			halls[menus[i].name] = (sortData(menus[i].menuDays));
			halls[menus[i].name].today = date.getFullYear() + "-" + addZero(date.getMonth() + 1) + "-" + addZero(date.getDate());
			halls[menus[i].name].yesterday = date.getFullYear() + "-" + addZero(date.getMonth() + 1) + "-" + addZero(date.getDate() - 1);
			halls[menus[i].name].tomorrow = date.getFullYear() + "-" + addZero(date.getMonth() + 1) + "-" + addZero(date.getDate() + 1);
		}
		await Bun.write('./data.json', JSON.stringify(halls))
		resolve(halls);
	})
}

function daysInThisMonth() {
	var now = new Date();
	return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
}


function getHall(hall) {

	switch (hall) {
		case ("commons"):
			hallID = "COMMONS DINING HALL";
			break;
		case ("sage"):
			hallID = "RPI - SAGE DINING HALL";
			break;
		case ("blitman"):
			hallID = "RPI - BLITMAN DINING HALL";
			break;
		case ("barh"):
			hallID = "RPI - BAR H DINING HALL";
			break;
		default:
			hallID = "";
			break;
	}
	return hallID;
}
function getMeal(meal) {
	switch (meal) {
		case ("breakfast"):
			return "BREAKFAST";
		case ("lunch"):
			return "LUNCH";
		case ("dinner"):
			return "DINNER";
	}
}


async function getData(hall, meal) {
	var file = Bun.file('./data.json');
	if (file.size != 0) {
		var menu = await file.json();
		if (menu.updated != today()) menu = await update();
	}
	else {
		var menu = await update();
	}
	var full = (menu[getHall(hall)][today()]);
	return (full[getMeal(meal)]);
}


module.exports = {
	data: new SlashCommandBuilder()
		.setName('menu')
		.setDescription("Get today's menu of any of RPI's dining halls")
		.addStringOption(option =>
			option
				.setName('hall')
				.setDescription('Name of the dining hall'))
		.addStringOption(option =>
			option
				.setName('meal')
				.setDescription('Meal to find (breakfast, lunch, or dinner)')),
	async execute(interaction) {
		if (interaction.options.getString("hall") == undefined) {
			await interaction.reply("Specify a dining hall.");
			return;
		}
		if (interaction.options.getString("meal") == undefined) {
			await interaction.reply("Specify a meal.");
			return;
		}

		const menu = await getData(interaction.options.getString("hall"), interaction.options.getString("meal"));
		var inline = [];
		for (const [key, value] of Object.entries(menu)) {
			if (key == "MISCELLANEOUS" || key == "SALAD") continue;
			listed = "";
			value.forEach((item) => {
				listed += item + "\n";
			})
			inline.push({name: key, value: listed, inline: true});
		}
		const exampleEmbed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle(getHall(interaction.options.getString("hall")) + " - " + getMeal(interaction.options.getString("meal")))
			.addFields(inline)
			.setTimestamp()

		const message = await interaction.reply({
			embeds: [exampleEmbed],
		});
	}
};