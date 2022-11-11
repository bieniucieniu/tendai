import { Collection } from "discord.js";
import { Command } from "@tendai/types";

const commands = [];

const commandsCollection = new Collection<string, Command>();

commands.forEach((command) => {
	commandsCollection.set(command.data.name, command);
});

export default commandsCollection;
