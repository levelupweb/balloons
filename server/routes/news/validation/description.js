export const description = value =>
	new Promise((resolve, reject) => {
		if (!value) {
			return reject("Поле 'Анонс' не заполнено");
		}

		if (typeof value !== "string") {
			return reject("Поле 'Анонс' заполнено некорректно");
		}

		if (value.length < 3 || value.length > 240) {
			return reject(
				"Поле 'Анонс' должно быть не меньше 3 и не больше 120 символов"
			);
		}

		return resolve(true);
	});

export default description;
