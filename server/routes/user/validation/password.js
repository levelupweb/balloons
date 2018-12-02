export const password = (value, { req }) =>
	new Promise((resolve, reject) => {
		if (!value) {
			return reject("Поле 'Пароль' не заполнено");
		}

		if (!req.body.passwordRepeat) {
			return reject("Поле 'Повторите пароль' не заполнено");
		}

		if (typeof value !== "string") {
			return reject("Поле 'Пароль' заполнено некорректно");
		}

		if (typeof req.body.passwordRepeat !== "string") {
			return reject("Поле 'Повторите пароль' заполнено некорректно");
		}

		if (value !== req.body.passwordRepeat) {
			return reject("Пароли не совпадают");
		}

		if (value.length > 100 || value.length < 6) {
			return reject(
				"Поле 'Пароль' должно быть не меньше 6 и не больше 100 символов"
			);
		}

		return resolve(true);
	});

export default password;
