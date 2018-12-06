import { ARTICLE_CATEGORY } from "@consts/article";

export const prepareArticle = temporaryArticle => {
	if (
		temporaryArticle[ARTICLE_CATEGORY] &&
		typeof temporaryArticle[ARTICLE_CATEGORY] !== "string"
	) {
		return {
			...temporaryArticle,
			[ARTICLE_CATEGORY]: temporaryArticle[ARTICLE_CATEGORY]._id
		};
	}

	return temporaryArticle;
};
