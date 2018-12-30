import express from "express";
import { News } from "@server/models";
import { createError } from "@server/utils";
import { auth, validation } from "@server/middlewares";
import * as middlewares from "./middlewares";

const router = express.Router();

router.get("/entries", (req, res, next) =>
	News.countDocuments().then(total =>
		News.find({})
			.then(news =>
				res.json({
					news,
					total
				})
			)
			.catch(error =>
				next(
					createError(
						"Не удалось загрузить список новостей. Попробуйте позже",
						error
					)
				)
			)
	)
);

router.get("/entry", [middlewares.parseQuery], (req, res, next) =>
	News.findOne(req.parsedQuery)
		.then(news =>
			News.find({ _id: { $ne: news._id } }, null, { limit: 6 }).then(other =>
				res.json({ current: news, other })
			)
		)
		.catch(error =>
			next(createError("Не удалось загрузить новость. Попробуйте позже", error))
		)
);

router.post(
	"/create",
	[auth(), middlewares.createValidation, validation],
	(req, res, next) =>
		News.create(req.matchedData)
			.then(created => res.json(created))
			.catch(error =>
				next(
					createError(
						"Не удалось создать новость. Обратитесь в тех. поддержку",
						error
					)
				)
			)
);

router.put(
	"/entry",
	[
		auth(),
		middlewares.parseQuery,
		middlewares.isNewsExist,
		middlewares.updateValidation,
		validation
	],
	(req, res, next) =>
		News.findOneAndUpdate(
			req.parsedQuery,
			{ $set: req.matchedData },
			{ new: true }
		)
			.then(updated => res.json(updated))
			.catch(error =>
				next(
					createError(
						"Не удалось обновить новость. Обратитесь в тех. поддержку",
						error
					)
				)
			)
);

router.delete(
	"/entry",
	[auth(), middlewares.parseQuery, middlewares.isNewsExist],
	(req, res, next) =>
		News.findOneAndRemove(req.parsedQuery)
			.then(() =>
				res.json({
					removed: true
				})
			)
			.catch(error =>
				next(
					createError(
						"Не удалось удалить новость. Обратитесь в тех. поддержку",
						error
					)
				)
			)
);

export const news = router;
export default router;
