export const login = value =>
	new Promise((resolve, reject) => {
		if (!value) {
			return reject("Поле 'Логин' не заполнено");
		}

		if (typeof value !== "string") {
			return reject("Поле 'Логин' заполнено некорректно");
		}

		if (value.length > 15 || value.length < 4) {
			return reject(
				"Поле 'Логин' должно быть не меньше 4 и не больше 15 символов"
			);
		}

		return resolve(true);
	});

export default login;
