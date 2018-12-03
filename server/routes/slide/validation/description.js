export const description = value =>
	new Promise((resolve, reject) => {
		if (!value) {
			return reject("Поле 'Текст' не заполнено");
		}

		if (typeof value !== "string") {
			return reject("Поле 'Текст' заполнено некорректно");
		}

		if (value.length > 128 || value.length < 4) {
			return reject(
				"Поле 'Текст' должно быть не меньше 4 и не больше 128 символов"
			);
		}

		return resolve(true);
	});

export default description;
