import { CommandInteraction, SlashCommandBuilder } from "discord.js";

export const stop = {
	data: new SlashCommandBuilder()
		.setName("stop")
		.setDescription("Stop the current song"),
	async execute(interaction: CommandInteraction) {
		return;
	},
};
