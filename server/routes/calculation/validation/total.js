export const total = value =>
	new Promise((resolve, reject) => {
		if (!value) {
			return reject("Поле 'Результат' не заполнено");
		}

		if (typeof value !== "number" || value < 0) {
			return reject("Поле 'Результат' заполнено некорректно");
		}
	});

export default total;
