import { FETCH_SIGNIN } from "../consts/_fetch";

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

	throw new Error("Unknown action");
};

export default fetch;
