export const title = value =>
	new Promise((resolve, reject) => {
		if (!value) {
			return reject("Поле 'Заголовок' не заполнено");
		}

		if (typeof value !== "string") {
			return reject("Поле 'Заголовок' заполнено некорректно");
		}

		if (value.length > 32 || value.length < 4) {
			return reject(
				"Поле 'Заголовок' должно быть не меньше 4 и не больше 32 символов"
			);
		}

		return resolve(true);
	});

export default title;
