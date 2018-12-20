import express from "express";
import { Portfolio } from "@server/models";
import { createError } from "@server/utils";
import { auth, validation } from "@server/middlewares";
import * as middlewares from "./middlewares";

const router = express.Router();

router.get("/entries", (_, res, next) =>
	Portfolio.find({})
		.then(portfolio => res.json(portfolio))
		.catch(error =>
			next(
				createError(
					"Не удалось загрузить список работ. Попробуйте позже",
					error
				)
			)
		)
);

router.get("/entry", [middlewares.parseQuery], (req, res, next) =>
	Portfolio.findOne(req.parsedQuery)
		.then(portfolio => res.json(portfolio))
		.catch(error =>
			next(createError("Не удалось загрузить работу. Попробуйте позже", error))
		)
);

router.post(
	"/create",
	[auth(), middlewares.createValidation, validation],
	(req, res, next) =>
		Portfolio.create(req.matchedData)
			.then(created => res.json(created))
			.catch(error =>
				next(
					createError(
						"Не удалось создать работу. Обратитесь в тех. поддержку",
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
		middlewares.isPortfolioExist,
		middlewares.updateValidation,
		validation
	],
	(req, res, next) =>
		Portfolio.findOneAndUpdate(
			req.parsedQuery,
			{ $set: req.matchedData },
			{ new: true }
		)
			.then(updated => res.json(updated))
			.catch(error =>
				next(
					createError(
						"Не удалось обновить работу. Обратитесь в тех. поддержку",
						error
					)
				)
			)
);

router.delete(
	"/entry",
	[auth(), middlewares.parseQuery, middlewares.isPortfolioExist],
	(req, res, next) =>
		Portfolio.findOneAndRemove(req.parsedQuery)
			.then(() =>
				res.json({
					removed: true
				})
			)
			.catch(error =>
				next(
					createError(
						"Не удалось удалить работу. Обратитесь в тех. поддержку",
						error
					)
				)
			)
);

export const portfolio = router;
export default router;
