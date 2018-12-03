import { FETCH_SIGNIN, FETCH_UI_ELEMENTS } from "@consts/_fetch";

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

	throw new Error("Unknown action");
};

export default fetch;
