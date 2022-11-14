import { Collection } from "discord.js";
import { SlashCommand } from "@tendai/types";
import { queue } from "./queue";
import { pause } from "./pause";
import { play } from "./play";
import { skip } from "./skip";
import { stop } from "./stop";

const commands = [play, pause, stop, skip, queue];

const commandsCollection = new Collection<string, SlashCommand>();

commands.forEach((command) => {
	if (command.data.name) commandsCollection.set(command.data.name, command);
});

export default commandsCollection;
