import { ARTICLE_MODEL } from "@consts/_models";

export const getDefaultCollections = pageProps => {
	const collections = {};

	if (pageProps.collectionsArticles) {
		return {
			...collections,
			[ARTICLE_MODEL]: pageProps.collectionsArticles
		};
	}
	return collections;
};
