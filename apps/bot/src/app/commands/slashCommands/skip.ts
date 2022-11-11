import { CommandInteraction, SlashCommandBuilder } from "discord.js";

export const skip = {
	data: new SlashCommandBuilder()
		.setName("skip")
		.setDescription("Skip the current song"),
	async execute(interaction: CommandInteraction) {
		return;
	},
};
