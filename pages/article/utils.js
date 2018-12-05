import { fetch } from "@utils";
import { ARTICLE_CATEGORY } from "@consts/article";

import {
	FETCH_ARTICLE_BY_SLUG,
	FETCH_CATEGORY_GET_ARTICLES
} from "@consts/_fetch";

export const getArticle = (fetcher, slug) =>
	fetch(fetcher, FETCH_ARTICLE_BY_SLUG, {
		params: {
			slug
		}
	});

export const getOtherArticles = (fetcher, article) =>
	fetch(fetcher, FETCH_CATEGORY_GET_ARTICLES, {
		params: {
			categoryId: article[ARTICLE_CATEGORY]._id
		}
	});
