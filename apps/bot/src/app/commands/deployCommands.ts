import slashCommands from "./slashCommands";
import contextCommands from "./contextCommands";
import { REST, Routes } from "discord.js";

export const deployCommands = async () => {
	const scJson = slashCommands
		.map((command) => command?.data.toJSON())
		.filter((command) => command.name);
	const ccJson = contextCommands
		.map((command) => command?.data.toJSON())
		.filter((command) => command.name);

	const json = scJson.concat(ccJson);

	const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

	console.log(`Deploying ${json.length} commands...`);

	try {
		const l = await rest.put(
			Routes.applicationGuildCommands(
				process.env.APICATION_ID,
				process.env.GUILD_ID
			),
			{
				body: json,
			}
		);
		Array.isArray(l) && console.log(`Deployed ${l.length} commands.`);
	} catch (error) {
		console.error(error);
	}
};
