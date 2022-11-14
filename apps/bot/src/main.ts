import * as dotenv from "dotenv";
import { DiscordClient } from "@tendai/discord-client";
import { EmbedBuilder, Events, GatewayIntentBits } from "discord.js";
import { deployCommands } from "./app/commands/deployCommands";
import slashCommands from "./app/commands/slashCommands";
import { format } from "date-fns";

dotenv.config();

const client = new DiscordClient({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildVoiceStates,
	],
});

client.once(Events.ClientReady, async (c) => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
	deployCommands();
});

client.on(Events.InteractionCreate, async (interaction) => {
	if (!interaction.isChatInputCommand()) return;

	const command = slashCommands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	await command.execute(interaction, client);
});

client.disTube
	.on("playSong", async (queue, song) => {
		// const queue = client.disTube.getQueue(interaction);
		// const song = queue.songs[0];
		const embed = new EmbedBuilder()
			.setColor("Green")
			.setTitle(`${song.name}`)
			.setURL(song.url)
			.setDescription("Now playing")
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

		await queue.textChannel.send({
			embeds: [embed],
		});
	})
	.on("addSong", async (queue, song) => {
		const embed = new EmbedBuilder()
			.setColor("Green")
			.setTitle(`${song.name}`)
			.setURL(song.url)
			.setDescription("added to queue")
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

		await queue.textChannel.send({
			embeds: [embed],
		});
	})
	.on("error", (channel, e) => {
		if (channel)
			channel.send(` An error encountered: ${e.toString().slice(0, 1974)}`);
		else console.error(e);
	})
	.on("searchNoResult", (message, query) =>
		message.channel.send(` No result found for \`${query}\`!`)
	)
	.on("finish", (queue) => queue.textChannel.send("Finished!"));

client.login(process.env.DISCORD_TOKEN);
