import express from "express";
import { sendEmail, createError } from "@server/utils";
import { validation } from "@server/middlewares";
import * as callbackEmail from "@server/email/callback";
import { createValidation } from "./middlewares";

const router = express.Router();

router.post("/create", [createValidation, validation], (req, res, next) =>
	sendEmail(
		"Заявка на обратный звонок",
		callbackEmail.rich(req.matchedData),
		callbackEmail.simple(req.matchedData)
	)
		.then(() => res.send(200))
		.catch(err => next(createError("Не удалось отправить заявку", err)))
);

export default router;
