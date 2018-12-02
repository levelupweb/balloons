export const content = value =>
	new Promise((resolve, reject) => {
		if (!value) {
			return reject("Поле 'Контент' не заполнено");
		}

		if (typeof value !== "string") {
			return reject("Поле 'Контент' заполнено некорректно");
		}

		return resolve(true);
	});

export default content;
