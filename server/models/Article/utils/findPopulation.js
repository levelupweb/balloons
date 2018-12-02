import { ARTICLE_CATEGORY } from "@consts/article";
import Article from "../model";

export const findPopulation = article =>
	Article.populate(article, [ARTICLE_CATEGORY]);

export default findPopulation;
