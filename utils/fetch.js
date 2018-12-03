import {
	FETCH_SIGNIN,
	FETCH_UI_ELEMENTS,
	FETCH_FILE_UPLOAD,
	FETCH_SLIDES,
	FETCH_UPDATE_SLIDE,
	FETCH_REMOVE_SLIDE,
	FETCH_ADD_SLIDE
} from "@consts/_fetch";

export const fetch = (fetcher, action, ...rest) => {
	if (typeof fetcher !== "function") {
		throw new Error("Fetcher is not valid");
	}

	if (!fetcher.get) {
		throw new Error("Fetcher is not valid axios instance");
	}

	if (action === FETCH_SIGNIN) {
		return fetcher.post("/user/signin", ...rest);
	}

	if (action === FETCH_UI_ELEMENTS) {
		return fetcher.get("/ui/elements");
	}

	if (action === FETCH_FILE_UPLOAD) {
		return fetcher.post("/image", ...rest);
	}

	if (action === FETCH_SLIDES) {
		return fetcher.get("/slide/entries");
	}

	if (action === FETCH_UPDATE_SLIDE) {
		return fetcher.put("/slide/entry", ...rest);
	}

	if (action === FETCH_REMOVE_SLIDE) {
		return fetcher.delete("/slide/entry", ...rest);
	}

	if (action === FETCH_ADD_SLIDE) {
		return fetcher.post("/slide/create", ...rest);
	}

	throw new Error("Unknown action");
};

export default fetch;
