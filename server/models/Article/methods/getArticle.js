import { Article } from "../model";
import { findPopulation } from "../utils";

export const getArticle = articleId =>
	Article.findById(articleId).then(findPopulation);
