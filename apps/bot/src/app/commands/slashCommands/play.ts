import { DiscordClient } from "@tendai/discord-client";
import {
	ChatInputCommandInteraction,
	EmbedBuilder,
	GuildMember,
	SlashCommandBuilder,
} from "discord.js";
import { format } from "date-fns";

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

		await interaction.reply({ content: "loading...", ephemeral: true });

		console.log("1st client.on");

		await client.disTube.play(member.voice.channel, opt, {
			member: member,
			textChannel: interaction.channel,
		});

		await (async () => {
			const queue = client.disTube.getQueue(interaction);
			const song = queue.songs[0];
			const embed = new EmbedBuilder()
				.setColor("Green")
				.setTitle(`${song.name}`)
				.setURL(song.url)
				.setImage(song.thumbnail)
				.setAuthor({
					name: song.uploader.name,
					url: song.uploader.url,
				})
				.addFields(
					{
						name: "views",
						value: `${Intl.NumberFormat("en", { notation: "compact" }).format(
							song.views
						)}`,
						inline: true,
					},
					{
						name: "duration",
						value: `${format(song.duration * 1000, "mm:ss")}	`,
						inline: true,
					}
				);

			await interaction.followUp({
				embeds: [embed],
			});
		})();
	},
};
