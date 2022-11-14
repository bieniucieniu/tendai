import { DiscordClient } from "@tendai/discord-client";
import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export const stop = {
	data: new SlashCommandBuilder()
		.setName("stop")
		.setDescription("Stop the current song")
		.setDMPermission(false),
	async execute(
		interaction: ChatInputCommandInteraction,
		client: DiscordClient
	) {
		const queue = client.disTube.getQueue(interaction);
		if (!queue) {
			interaction.reply(` There is nothing to stop`);
			return;
		}
		try {
			await queue.stop();
			interaction.reply(`stoped`);
		} catch (e) {
			interaction.reply(`error: ${e}`);
		}
	},
};
