import { ARTICLE_CATEGORY } from "@consts/article";
import { ARTICLE_TITLE, ARTICLE_SLUG } from "@consts/article";
import { CATEGORY_TITLE } from "@consts/category";

const createSingle = article => ({
	title: article[ARTICLE_TITLE],
	slug: article[ARTICLE_SLUG],
	id: article._id
});

export const createMenu = allArticles =>
	allArticles.reduce((prev, curr) => {
		if (curr[ARTICLE_CATEGORY]) {
			const categoryId = curr[ARTICLE_CATEGORY]._id;

			if (prev[categoryId]) {
				return {
					...prev,
					[categoryId]: {
						...prev[categoryId],
						elements: [...prev[categoryId].elements, createSingle(curr)]
					}
				};
			} else {
				return {
					...prev,
					[categoryId]: {
						title: curr[ARTICLE_CATEGORY][CATEGORY_TITLE],
						elements: [createSingle(curr)]
					}
				};
			}
		}
		const articleId = curr._id;

		return {
			...prev,
			[articleId]: createSingle(curr)
		};
	}, {});
