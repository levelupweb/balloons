import * as fetchConsts from "@consts/_fetch";

export const fetch = (fetcher, action, ...rest) => {
	if (typeof fetcher !== "function") {
		throw new Error("Fetcher is not valid");
	}

	if (!fetcher.get) {
		throw new Error("Fetcher is not valid axios instance");
	}

	if (action === fetchConsts.FETCH_SIGNIN) {
		return fetcher.post("/user/signin", ...rest);
	}

	if (action === fetchConsts.FETCH_UI_ELEMENTS) {
		return fetcher.get("/ui/elements");
	}

	if (action === fetchConsts.FETCH_FILE_UPLOAD) {
		return fetcher.post("/image", ...rest);
	}

	if (action === fetchConsts.FETCH_SLIDES) {
		return fetcher.get("/slide/entries");
	}

	if (action === fetchConsts.FETCH_UPDATE_SLIDE) {
		return fetcher.put("/slide/entry", ...rest);
	}

	if (action === fetchConsts.FETCH_REMOVE_SLIDE) {
		return fetcher.delete("/slide/entry", ...rest);
	}

	if (action === fetchConsts.FETCH_ADD_SLIDE) {
		return fetcher.post("/slide/create", ...rest);
	}

	if (action === fetchConsts.FETCH_ARTICLES) {
		return fetcher.get("/article/entries");
	}

	if (action === fetchConsts.FETCH_ARTICLE_BY_ID) {
		return fetcher.get("/article/entry/id", ...rest);
	}

	if (action === fetchConsts.FETCH_ARTICLE_BY_SLUG) {
		return fetcher.get("/article/entry", ...rest);
	}

	if (action === fetchConsts.FETCH_CATEGORY_GET_ARTICLES) {
		return fetcher.get("/category/articles", ...rest);
	}

	if (action === fetchConsts.FETCH_UPDATE_ARTICLE) {
		return fetcher.put("/article/entry", ...rest);
	}

	if (action === fetchConsts.FETCH_SALES_ENTRIES) {
		return fetcher.get("/sale/entries", ...rest);
	}

	if (action === fetchConsts.FETCH_SALES_CREATE) {
		return fetcher.post("/sale/create", ...rest);
	}

	if (action === fetchConsts.FETCH_SALES_UPDATE) {
		return fetcher.put("/sale/entry", ...rest);
	}

	if (action === fetchConsts.FETCH_SALES_REMOVE) {
		return fetcher.delete("/sale/entry", ...rest);
	}

	if (action === fetchConsts.FETCH_CONTACT_US) {
		return fetcher.post("/contact/create", ...rest);
	}

	throw new Error("Unknown action");
};

export default fetch;
