import { Article } from "../model";
import { findPopulation } from "../utils";

export const updateArticle = (articleId, data) =>
	Article.findByIdAndUpdate(articleId, data, { new: true }).then(
		findPopulation
	);
