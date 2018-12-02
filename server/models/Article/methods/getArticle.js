import { Article } from "../model";
import { findPopulation } from "../utils";
import { ARTICLE_SLUG } from "../../../../consts/article";

export const getArticle = slug =>
	Article.findOne({ [ARTICLE_SLUG]: slug }).then(findPopulation);
