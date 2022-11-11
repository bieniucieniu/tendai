import { Collection } from "discord.js";
import { Command } from "@tendai/types";
import { getQueue } from "./getQueue";
import { pause } from "./pause";
import { play } from "./play";
import { skip } from "./skip";
import { stop } from "./stop";

const commands = [play, pause, stop, skip, getQueue];

const commandsCollection = new Collection<string, Command>();

commands.forEach((command) => {
	commandsCollection.set(command.data.name, command);
});

export default commandsCollection;
