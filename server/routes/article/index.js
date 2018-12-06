import express from "express";
import { auth, validation } from "@server/middlewares";
import { createError, createSlug } from "@server/utils";
import { ARTICLE_SLUG, ARTICLE_TITLE, ARTICLE_CATEGORY } from "@consts/article";
import { Article } from "@server/models";
import { createValidation, updateValidation } from "./middlewares";

const router = express.Router();

router.post(
	"/create",
	[auth(), createValidation, validation],
	(req, res, next) =>
		Article.createArticle({
			[ARTICLE_SLUG]: createSlug(req.matchedData[ARTICLE_TITLE]),
			...req.matchedData
		})
			.then(article => res.json(article))
			.catch(error =>
				next(createError("Не удалось создать новую статью", error))
			)
);

router.get("/entry", (req, res, next) =>
	Article.getArticle({ [ARTICLE_SLUG]: req.query.slug })
		.then(article => {
			if (!article || !article._id) {
				return next(createError("Статья не была найдена в базе данных"));
			}
			return res.json(article);
		})
		.catch(error => next(createError("Не удалось найсти статью", error)))
);

router.get("/entry/id", (req, res, next) =>
	Article.getArticle({ _id: req.query.articleId })
		.then(article => {
			if (!article || !article._id) {
				return next(createError("Статья не была найдена в базе данных"));
			}
			return res.json(article);
		})
		.catch(error => next(createError("Не удалось найсти статью", error)))
);

router.get("/entries", (_, res, next) =>
	Article.find({})
		.populate(ARTICLE_CATEGORY)
		.then(articles => res.json(articles))
		.catch(error => next(createError("Не удалось найсти статьи", error)))
);

router.delete("/entry", [auth()], (req, res, next) =>
	Article.getArticle({ _id: req.query.articleId }).then(article => {
		if (!article || !article._id) {
			return next(createError("Статья не была найдена в базе данных"));
		}

		return Article.findByIdAndRemove(req.query.articleId)
			.then(article => res.json(article))
			.catch(error => createError("Не удалось удалить статью", error));
	})
);

router.put("/entry", [auth(), updateValidation, validation], (req, res, next) =>
	Article.getArticle({ _id: req.query.articleId }).then(article => {
		if (!article || !article._id) {
			return next(createError("Статья не была найдена в базе данных"));
		}

		return Article.updateArticle(req.query.articleId, req.matchedData)
			.then(article => res.json(article))
			.catch(error => createError("Не удалось обновить статью", error));
	})
);

export default router;
