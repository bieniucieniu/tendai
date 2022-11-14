import { Client, ClientOptions } from "discord.js";
import { DisTube } from "distube";

export class DiscordClient extends Client {
	private _distube = new DisTube(this, {
		leaveOnStop: false,
		emitNewSongOnly: true,
		emitAddSongWhenCreatingQueue: false,
		emitAddListWhenCreatingQueue: false,
	});

	constructor(options: ClientOptions) {
		super(options);
	}

	get disTube(): DisTube {
		return this._distube;
	}
}
