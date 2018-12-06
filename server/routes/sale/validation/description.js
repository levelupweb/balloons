export const description = value =>
	new Promise((resolve, reject) => {
		if (!value) {
			return reject("Поле 'Описание' не заполнено");
		}

		if (typeof value !== "string") {
			return reject("Поле 'Описание' заполнено некорректно");
		}

		if (value.length < 5 || value.length > 10000) {
			return reject(
				"Поле 'Описание' должно содержать не менее 5 и не более 10000 символов"
			);
		}

		return resolve(true);
	});

export default description;
