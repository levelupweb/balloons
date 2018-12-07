export const name = value =>
	new Promise((resolve, reject) => {
		if (!value) {
			return reject("Поле 'Имя' не заполнено");
		}

		if (typeof value !== "string") {
			return reject("Поле 'Имя' заполнено некорректно");
		}

		if (value.length < 3 || value.length > 300) {
			return reject(
				"Поле 'Имя' должно быть не меньше 3 и не больше 3 символов"
			);
		}

		return resolve(true);
	});

export default name;
