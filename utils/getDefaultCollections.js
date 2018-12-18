import { SALE_MODEL, ARTICLE_MODEL, NEWS_MODEL } from "@consts/_models";

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
			[SALE_MODEL]: pageProps.collectionsSales
		};
	}

	if (pageProps.collectionsNews) {
		return {
			...collections,
			[NEWS_MODEL]: pageProps.collectionsNews
		};
	}

	return collections;
};
