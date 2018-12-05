export const agreement = value =>
	new Promise((resolve, reject) => {
		if (!value && value !== false) {
			return reject("Поле 'Соглашение' не заполнено");
		}

		if (typeof value !== "boolean") {
			return reject("Поле 'Соглашение' заполнено некорректно");
		}

		if (value === false) {
			return reject("Вы не приняли Соглашение");
		}

		return resolve(true);
	});

export default agreement;
