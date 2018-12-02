import { Article } from "../model";
import { findPopulation } from "../utils";

export const createArticle = article =>
	Article.create(article).then(findPopulation);
