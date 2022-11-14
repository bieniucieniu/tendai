import { DiscordClient } from "@tendai/discord-client";
import {
	ChatInputCommandInteraction,
	GuildMember,
	SlashCommandBuilder,
} from "discord.js";

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
	async execute(
		interaction: ChatInputCommandInteraction,
		client: DiscordClient
	) {
		const opt = interaction.options.getString("query");
		const member = interaction.member as GuildMember;

		if (!member.voice.channel) {
			interaction.reply({
				content: "you are not in voice channel",
				ephemeral: true,
			});
			return;
		}

		await interaction.reply({ content: "loading...", ephemeral: true });

		await client.disTube.play(member.voice.channel, opt, {
			member: member,
			textChannel: interaction.channel,
		});

		await interaction.editReply({ content: "loaded" });
	},
};
