import { SALE_MODEL, ARTICLE_MODEL } from "@consts/_models";
import {} from "../consts/_models";

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
	return collections;
};
