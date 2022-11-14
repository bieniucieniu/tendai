import { CommandInteraction, SlashCommandBuilder } from "discord.js";

export const queue = {
	data: new SlashCommandBuilder()
		.setName("queue")
		.setDescription("Get the current queue"),
	async execute(interaction: CommandInteraction) {
		return;
	},
};
