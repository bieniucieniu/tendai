import { CommandInteraction, SlashCommandBuilder } from "discord.js";

export const play = {
	data: new SlashCommandBuilder()
		.setName("play")
		.setDescription("Play a song")
		.addStringOption((option) =>
			option
				.setName("query")
				.setDescription("The song to play")
				.setRequired(true)
		)
		.setDMPermission(false),
	async execute(interaction: CommandInteraction) {
		return;
	},
};
