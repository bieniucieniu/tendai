import { DiscordClient } from "@tendai/discord-client";
import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export const skip = {
	data: new SlashCommandBuilder()
		.setName("skip")
		.setDescription("Skip the current song")
		.addIntegerOption((option) =>
			option.setName("num").setDescription("skip to num").setRequired(false)
		)
		.setDMPermission(false),
	async execute(
		interaction: ChatInputCommandInteraction,
		client: DiscordClient
	) {
		const queue = client.disTube.getQueue(interaction);
		let opt = interaction.options.getInteger("num");
		if (!queue) {
			interaction.reply(` There is nothing in the queue right now!`);
			return;
		}
		if (opt >= queue.songs.length) opt = queue.songs.length - 1;
		try {
			if (opt) {
				await client.disTube.jump(interaction, opt);
			} else {
				await queue.skip();
			}
			interaction.reply(`Skipped to:`);
		} catch (e) {
			interaction.reply({ content: `error: ${e}`, ephemeral: true });
		}
	},
};
