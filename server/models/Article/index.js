import * as methods from "./methods";
import ArticleModel from "./model";

ArticleModel.getArticle = methods.getArticle;
ArticleModel.getArticles = methods.getArticles;
ArticleModel.createArticle = methods.createArticle;
ArticleModel.updateArticle = methods.updateArticle;

export const Article = ArticleModel;
export default Article;
