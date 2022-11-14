import { Collection } from "discord.js";
import { SlashCommand } from "@tendai/types";

const commands = [];

const commandsCollection = new Collection<string, SlashCommand>();

commands.forEach((command) => {
	if (command.data.name) commandsCollection.set(command.data.name, command);
});

export default commandsCollection;
