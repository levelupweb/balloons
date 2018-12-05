import express from "express";
import { Calculation } from "@server/models";
import { createError } from "@server/utils";
import { validation } from "@server/middlewares";
import * as middlewares from "./middlewares";

const router = express.Router();

router.get("/entries", [middlewares.parseParams], (req, res, next) =>
	Calculation.getCalculations(req.parsedParams)
		.then(calculations => res.json(calculations))
		.catch(error => next(createError("Не удалось получить статистику", error)))
);

router.post(
	"/create",
	[middlewares.createValidation, validation],
	(req, res, next) =>
		Calculation.createCalculation(req.matchedData)
			.then(() => res.send(200))
			.catch(error => next(createError("Не удалось создать статистику", error)))
);

export const calculation = router;
export default router;
