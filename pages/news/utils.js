import { fetch } from "@utils";
import { FETCH_NEWS } from "@consts/_fetch";

export const getDefaultNews = (fetcher, page = 0) =>
	fetch(fetcher, FETCH_NEWS, {
		params: {
			skip: page * 10,
			limit: 10
		}
	});
