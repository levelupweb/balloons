export const description = value =>
	new Promise((resolve, reject) => {
		if (!value) {
			return reject("Поле 'Превью' не заполнено");
		}

		if (typeof value !== "string") {
			return reject("Поле 'Превью' заполнено некорректно");
		}

		if (value.length > 240 || value.length < 10) {
			return reject(
				"Поле 'Превью' должно быть не меньше 10 и не больше 240 символов"
			);
		}

		return resolve(true);
	});

export default description;
