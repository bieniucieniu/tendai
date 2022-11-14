import { YTvData } from "@tendai/types";

export const getYTvData = async (
	key: string,
	maxResults?: number
): Promise<YTvData[] | undefined> => {
	const dataOut: YTvData[] = [];
	try {
		const respons = await fetch(
			`https://www.googleapis.com/youtube/v3/search?q=${key}&part=snippet&maxResults=${
				maxResults || 1
			}&key=${process.env.GOOGLE_API_KEY}`
		);
		const json = await respons.json();

		if (!json.items) return;
		json.items.forEach((e: any) => {
			if (!(e.id.kind === "youtube#video")) return;
			dataOut.push({
				id: e.id.videoId,
				title: e.snippet.title,
				channelTitle: e.snippet.channelTitle,
				publishTime: e.snippet.publishTime,
				thumbnail: e.snippet.thumbnails.default.url,
			});
		});
	} catch (error) {
		console.error(error);
	}
	return dataOut;
};
