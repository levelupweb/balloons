import express from "express";
import { auth, validation } from "@server/middlewares";
import { createError } from "@server/utils";
import { Category } from "@server/models";

import { createValidation, updateValidation } from "./middlewares";

const router = express.Router();

router.post(
	"/create",
	[auth(), createValidation, validation],
	(req, res, next) =>
		Category.create(req.matchedData)
			.then(category => res.json(category))
			.catch(error =>
				next(createError("Не удалось создать новую категорию", error))
			)
);

router.get("/entry", (req, res, next) =>
	Category.findById(req.query.categoryId)
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
