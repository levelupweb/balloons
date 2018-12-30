import { fetch } from "@utils";
import { FETCH_NEWS, FETCH_NEWS_ENTRY } from "@consts/_fetch";

export const getDefaultNews = (fetcher, page = 0) =>
	fetch(fetcher, FETCH_NEWS, {
		params: {
			skip: page * 10,
			limit: 10
		}
	});

export const getEntry = (fetcher, newsId) =>
	fetch(fetcher, FETCH_NEWS_ENTRY, {
		params: {
			newsId
		}
	});

export const isEditing = editMode => {
	if (editMode === "1") {
		return true;
	}

	return false;
};
