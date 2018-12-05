export const params = value =>
	new Promise((resolve, reject) => {
		if (!value) {
			return reject("Поле 'Параметры' не заполнено");
		}

		if (typeof value !== "string") {
			return reject("Поле 'Параметры' заполнено некорректно");
		}
	});

export default params;
