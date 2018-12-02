import express from "express";
import { User } from "@server/models";
import { auth, validation } from "@server/middlewares";
import { USER_PASSWORD, USER_LOGIN } from "@consts/user";
import { createValidation } from "./middlewares";

import {
	createError,
	createToken,
	hashWithSecret,
	verifySomethingWithHashed
} from "@server/utils";

const router = express.Router();

if (process.env.NODE_ENV === "development") {
	router.post("/create", [createValidation, validation], (req, res, next) =>
		hashWithSecret(req.matchedData[USER_PASSWORD])
			.then(hashedPassword =>
				User.createUser({
					...req.matchedData,
					[USER_PASSWORD]: hashedPassword
				})
			)
			.then(createdUser => res.json(createdUser))
			.catch(error =>
				next(createError("Не удалось создать пользователя", error))
			)
	);
}

router.post("/signin", (req, res, next) => {
	const { login, password } = req.body;

	if (!login || !password) {
		return next(createError("Одно из полей 'Логин' или 'пароль' не заполнено"));
	}

	return User.findOne({ [USER_LOGIN]: login }, [USER_PASSWORD])
		.then(user => {
			if (!user || !user._id) {
				return next(createError("Пользователь не найден"));
			}

			return verifySomethingWithHashed(password, user[USER_PASSWORD]).then(
				verified => {
					if (!verified) {
						return next(createError("Неверный пароль"));
					}

					return createToken({
						userId: user._id
					}).then(token =>
						res.json({
							token,
							user
						})
					);
				}
			);
		})
		.catch(err => next(createError("Не удалось выполнить авторизацию", err)));
});

router.get("/auth", [auth()], (req, res) => {
	res.json(req.user);
});

export default router;
