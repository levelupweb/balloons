import {
	ARTICLE_TITLE,
	ARTICLE_SLUG,
	ARTICLE_DISPLAY_HEADER,
	ARTICLE_CATEGORY,
	ARTICLE_INDEX
} from "@consts/article";

import {
	CATEGORY_TITLE,
	CATEGORY_DISPLAY_HEADER,
	CATEGORY_INDEX
} from "@consts/category";

const createSingle = article => ({
	title: article[ARTICLE_TITLE],
	slug: article[ARTICLE_SLUG],
	index: article[ARTICLE_INDEX],
	id: article._id
});

export const createMenu = allArticles => {
	const items = allArticles.reduce(
		(prev, curr) => {
			if (!curr[ARTICLE_DISPLAY_HEADER]) {
				return prev;
			}
			if (curr[ARTICLE_CATEGORY]) {
				const categoryId = curr[ARTICLE_CATEGORY]._id;

				if (!curr[ARTICLE_CATEGORY][CATEGORY_DISPLAY_HEADER]) {
					return prev;
				}

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
							index: curr[ARTICLE_CATEGORY][CATEGORY_INDEX],
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
		},
		{
			promo: {
				title: "Акции",
				link: "/sales",
				index: 100,
				id: "sales"
			},
			index: {
				title: "Главная",
				link: "/",
				id: "index",
				index: -1
			}
		}
	);

	const sorted = Object.keys(items)
		.sort((a, b) => items[a].index - items[b].index)
		.map(key => {
			if (typeof items[key] === "object" && items[key].element) {
				return items[key].elements.sort((a, b) => a.index - b.index);
			}

			return items[key];
		});


	return sorted;
};
