import { DiscordClient } from "@tendai/discord-client";
import {
	ChatInputCommandInteraction,
	EmbedBuilder,
	SlashCommandBuilder,
} from "discord.js";

export const queue = {
	data: new SlashCommandBuilder()
		.setName("queue")
		.setDescription("Get the current queue")
		.setDMPermission(false),
	async execute(
		interaction: ChatInputCommandInteraction,
		client: DiscordClient
	) {
		const queue = client.disTube.getQueue(interaction);
		if (!queue) {
			interaction.reply({ content: "no queue", ephemeral: true });
			return;
		}
		let songNames = "";
		queue.songs.forEach((e, i) => {
			let name = e.name;
			if (e.name.length >= 60) {
				name = e.name.substring(0, 60);
				name += "...";
			}
			songNames += `${i + 1}: ${name} \n`;
		});

		const embed = new EmbedBuilder()
			.setColor("Green")
			.addFields({ name: "queue", value: songNames });

		interaction.reply({ embeds: [embed] });
	},
};
