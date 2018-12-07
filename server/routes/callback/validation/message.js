export const message = value =>
	new Promise((resolve, reject) => {
		if (!value) {
			return resolve();
		}

		if (typeof value !== "string") {
			return reject("Поле 'Сообщение' заполнено некорректно");
		}

		if (value.length < 4 || value.length > 50000) {
			return reject(
				"Поле 'Сообщение' должно быть не меньше 4 и не больше 50000 символов"
			);
		}

		return resolve(true);
	});

export default message;
