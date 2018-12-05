import express from "express";
import { auth, validation } from "@server/middlewares";
import { createError, createSlug } from "@server/utils";
import { Category } from "@server/models";
import { ARTICLE_CATEGORY } from "@consts/article";
import { CATEGORY_SLUG, CATEGORY_TITLE } from "@consts/category";
import { createValidation, updateValidation } from "./middlewares";
import Article from "../../models/Article";

const router = express.Router();

router.post(
	"/create",
	[auth(), createValidation, validation],
	(req, res, next) =>
		Category.create({
			[CATEGORY_SLUG]: createSlug(req.matchedData[CATEGORY_TITLE]),
			...req.matchedData
		})
			.then(category => res.json(category))
			.catch(error =>
				next(createError("Не удалось создать новую категорию", error))
			)
);

router.get("/articles", (req, res, next) =>
	Article.getArticles({ [ARTICLE_CATEGORY]: req.query.categoryId })
		.then(articles => res.json(articles))
		.catch(err => next(createError("Не удалось найти статьи", err)))
);

router.get("/entry/:slug", (req, res, next) =>
	Category.findOne({ [CATEGORY_SLUG]: req.params.slug })
		.then(category => {
			if (!category || !category._id) {
				return next(createError("Категория не была найдена в базе данных"));
			}
			return res.json(category);
		})
		.catch(error => next(createError("Не удалось найсти категорию", error)))
);

router.delete("/entry", [auth()], (req, res, next) =>
	Category.findById(req.query.categoryId).then(category => {
		if (!category || !category._id) {
			return next(createError("Категория не была найдена в базе данных"));
		}

		return Category.findByIdAndRemove(req.query.categoryId)
			.then(category => res.json(category))
			.catch(error => createError("Не удалось удалить категорию", error));
	})
);

router.put("/entry", [auth(), updateValidation, validation], (req, res, next) =>
	Category.findById(req.query.categoryId).then(category => {
		if (!category || !category._id) {
			return next(createError("Категория не была найдена в базе данных"));
		}

		return Category.findByIdAndUpdate(req.query.categoryId, req.matchedData, {
			new: true
		})
			.then(category => res.json(category))
			.catch(error => createError("Не удалось обновить категорию", error));
	})
);

export default router;
