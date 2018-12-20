export const title = value =>
	new Promise((resolve, reject) => {
		if (!value) {
			return reject("Поле 'Заголовок' не заполнено");
		}

		if (typeof value !== "string") {
			return reject("Поле 'Заголовок' заполнено некорректно");
		}

		if (value.length < 3 || value.length > 120) {
			return reject(
				"Поле 'Заголовок' должно быть не меньше 3 и не больше 120 символов"
			);
		}

		return resolve(true);
	});

export default title;
