import { DiscordClient } from "@tendai/discord-client";
import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export const pause = {
	data: new SlashCommandBuilder()
		.setName("pause")
		.setDescription("Pause the current song")
		.setDMPermission(false),
	async execute(
		interaction: ChatInputCommandInteraction,
		client: DiscordClient
	) {
		const queue = client.disTube.getQueue(interaction);

		if (!queue) {
			await interaction.reply({
				content: "There is nothing in the queue right now!",
				ephemeral: true,
			});
			return;
		}
		if (queue.paused) {
			queue.resume();
			await interaction.reply({
				content: `Resumed the song\`${queue[0]}\``,
			});
			return;
		}
		queue.pause();
		interaction.reply({ content: `Paused the song\`${queue[0]}\`` });
	},
};
