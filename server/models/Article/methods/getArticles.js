import { Article } from "../model";
import { findPopulation } from "../utils";

const defaultParams = {
	skip: 0,
	limit: 10
};

export const getArticles = (query, params) =>
	Article.find(query, null, {
		...defaultParams,
		...params
	}).then(findPopulation);

export default getArticles;
