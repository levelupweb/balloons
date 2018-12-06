import express from "express";
import { auth, validation } from "@server/middlewares";
import { createError } from "@server/utils";
import Sale from "@server/models/Sale";
import * as middlewares from "./middlewares";

const router = express.Router();

router.get(
	"/entries",
	[middlewares.parseQuery, middlewares.parseParams],
	(req, res, next) =>
		Sale.getSales(req.parsedQuery, req.parsedParams)
			.then(sales => res.json(sales))
			.catch(error =>
				next(createError("Не удалось получить список акций", error))
			)
);

router.post(
	"/create",
	[
		auth(),
		middlewares.createOrUpdateSanitizers,
		middlewares.createValidation,
		validation
	],
	(req, res, next) =>
		Sale.createSale(req.matchedData)
			.then(sale => res.json(sale))
			.catch(error => next(createError("Не удалось создать акцию", error)))
);

router.put(
	"/entry",
	[
		auth(),
		middlewares.parseQuery,
		middlewares.createOrUpdateSanitizers,
		middlewares.updateValidation,
		validation
	],
	(req, res, next) =>
		Sale.updateSale(req.parsedQuery, req.matchedData)
			.then(sale => res.json(sale))
			.catch(error => next(createError("Не удалось обновить акцию", error)))
);

router.delete("/entry", [auth(), middlewares.parseQuery], (req, res, next) =>
	Sale.removeSale(req.parsedQuery)
		.then(sale => res.json(sale))
		.catch(error => next(createError("Не удалось удалить акцию", error)))
);

export const sale = router;
export default router;
