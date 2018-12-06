export const title = value =>
	new Promise((resolve, reject) => {
		if (!value) {
			return reject("Поле 'Название' не заполнено");
		}

		if (typeof value !== "string") {
			return reject("Поле 'Название' заполнено некорректно");
		}

		if (value.length < 3 || value.length > 500) {
			return reject(
				"Поле 'Название' должно содержать не менее 3 и не более 500 символов"
			);
		}

		return resolve(true);
	});

export default title;
