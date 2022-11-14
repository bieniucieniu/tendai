import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { DiscordClient } from "@tendai/discord-client";

export interface YTvData {
	id: string;
	title?: string;
	channelTitle?: string;
	publishTime?: string;
	thumbnail?: URL;
}

export interface SlashCommand {
	data: SlashCommandBuilder;
	execute: (
		interaction: ChatInputCommandInteraction,
		discordClient?: DiscordClient
	) => Promise<void>;
}
