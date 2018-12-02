export const title = value =>
	new Promise((resolve, reject) => {
		if (!value) {
			return reject("Поле 'Название категории' не заполнено");
		}

		if (typeof value !== "string") {
			return reject("Поле 'Название категории' заполнено некорректно");
		}

		if (value.length > 24 || value.length < 4) {
			return reject(
				"Поле 'Название категории' должно быть не меньше 4 и не больше 24 символов"
			);
		}

		return resolve(true);
	});

export default title;
