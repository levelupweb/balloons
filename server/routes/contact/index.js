import express from "express";
import { Contact } from "@server/models";
import { validation } from "@server/middlewares";
import { createError, sendEmail } from "@server/utils";
import * as middlewares from "./middlewares";

const router = express.Router();

router.get(
	"/entries",
	[middlewares.parseQuery, middlewares.parseParams],
	(req, res, next) =>
		Contact.getContacts(req.parsedQuery, req.parsedParams)
			.then(contacts => res.json(contacts))
			.catch(error =>
				next(createError("Не удалось получить список контактов", error))
			)
);

router.post(
	"/create",
	[middlewares.createValidation, validation],
	(req, res, next) =>
		Contact.createContact(req.matchedData)
			.then(contact =>
				sendEmail(
					"example@example.com",
					"Вам прислали контакт",
					"<div>Hello world</div>"
				).then(() => contact)
			)
			.then(contact => res.json(contact))
			.catch(error => next(createError("Не удалось отправить контакт", error)))
);

export default router;
