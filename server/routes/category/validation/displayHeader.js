export const displayHeader = value =>
	new Promise((resolve, reject) => {
		if (!value && value !== false) {
			return reject("Поле 'Показ в шапке' не заполнено");
		}

		if (typeof value !== "boolean") {
			return reject("Поле 'Показ в шапке' заполнено некорректно");
		}

		return resolve(true);
	});

export default displayHeader;
