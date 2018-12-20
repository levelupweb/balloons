import { SALE_MODEL, ARTICLE_MODEL, NEWS_MODEL } from "@consts/_models";
import { PORTFOLIO_MODEL } from "../consts/_models";

export const getDefaultCollections = pageProps => {
	let collections = {};

	if (pageProps.collectionsArticles) {
		collections = {
			...collections,
			[ARTICLE_MODEL]: pageProps.collectionsArticles
		};
	}

	if (pageProps.collectionsSales) {
		collections = {
			...collections,
			[SALE_MODEL]: pageProps.collectionsSales
		};
	}

	if (pageProps.collectionsNews) {
		collections = {
			...collections,
			[NEWS_MODEL]: pageProps.collectionsNews
		};
	}

	if (pageProps.collectionsPortfolio) {
		collections = {
			...collections,
			[PORTFOLIO_MODEL]: pageProps.collectionsPortfolio
		};
	}

	return collections;
};
