import { Client, ClientOptions } from "discord.js";

export class DiscordClient extends Client {
	constructor(options: ClientOptions) {
		super(options);
	}
}
