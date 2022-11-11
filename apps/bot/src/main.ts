import * as dotenv from "dotenv";
import { DiscordClient } from "./app/client/discordClient/DiscordClient";
import { Events, GatewayIntentBits } from "discord.js";
import { deployCommands } from "./app/commands/deployCommands";

dotenv.config();

// (async () => {
// 	const data = await getYTvData("bones");
// 	console.log(data);
// })();

const client = new DiscordClient({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildVoiceStates,
	],
});

client.once(Events.ClientReady, (c) => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
	deployCommands();
});

client.login(process.env.DISCORD_TOKEN);
