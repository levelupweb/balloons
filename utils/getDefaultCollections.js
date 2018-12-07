import { ARTICLE_SALE, ARTICLE_MODEL } from "@consts/_models";

export const getDefaultCollections = pageProps => {
	const collections = {};

	if (pageProps.collectionsArticles) {
		return {
			...collections,
			[ARTICLE_MODEL]: pageProps.collectionsArticles
		};
	}

	if (pageProps.collectionsSales) {
		return {
			...collections,
			[ARTICLE_SALE]: pageProps.collectionsSales
		};
	}
	return collections;
};
