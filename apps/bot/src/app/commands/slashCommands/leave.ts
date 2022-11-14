import { DiscordClient } from "@tendai/discord-client";
import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export const leave = {
	data: new SlashCommandBuilder()
		.setName("leave")
		.setDescription("bot leave the channel")
		.setDMPermission(false),
	async execute(
		interaction: ChatInputCommandInteraction,
		client: DiscordClient
	) {
		client.disTube.voices.leave(interaction);
	},
};
