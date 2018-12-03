import {
	FETCH_SIGNIN,
	FETCH_UI_ELEMENTS,
	FETCH_FILE_UPLOAD
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

	throw new Error("Unknown action");
};

export default fetch;
