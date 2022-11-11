import { CommandInteraction, SlashCommandBuilder } from "discord.js";

export const pause = {
	data: new SlashCommandBuilder()
		.setName("pause")
		.setDescription("Pause the current song"),
	async execute(interaction: CommandInteraction) {
		return;
	},
};
