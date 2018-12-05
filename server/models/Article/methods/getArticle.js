import { Article } from "../model";
import { findPopulation } from "../utils";

export const getArticle = query => Article.findOne(query).then(findPopulation);
