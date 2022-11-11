import {
	SlashCommandBuilder,
	UserContextMenuCommandInteraction,
} from "discord.js";

export interface YTvData {
	id: string;
	title?: string;
	channelTitle?: string;
	publishTime?: string;
	thumbnail?: URL;
}

export interface Command {
	data: SlashCommandBuilder;
	execute: (interaction: UserContextMenuCommandInteraction) => Promise<void>;
}

export interface Command {
	data: SlashCommandBuilder;
	execute: (interaction: UserContextMenuCommandInteraction) => Promise<void>;
}
