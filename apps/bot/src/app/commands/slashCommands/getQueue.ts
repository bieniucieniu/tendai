import { CommandInteraction, SlashCommandBuilder } from "discord.js";

export const getQueue = {
	data: new SlashCommandBuilder()
		.setName("queue")
		.setDescription("Get the current queue"),
	async execute(interaction: CommandInteraction) {
		return;
	},
};
