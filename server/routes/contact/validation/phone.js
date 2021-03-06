export const phone = value =>
	new Promise((resolve, reject) => {
		if (!value) {
			return reject("Поле 'Телефон' не заполнено");
		}

		if (typeof value !== "string") {
			return reject("Поле 'Телефон' заполнено некорректно");
		}

		return resolve(true);
	});

export default phone;
