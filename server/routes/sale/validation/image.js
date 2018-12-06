export const image = value =>
	new Promise((resolve, reject) => {
		if (!value) {
			return reject("Поле 'Изображение' не заполнено");
		}

		if (typeof value !== "string") {
			return reject("Поле 'Изображение' заполнено некорректно");
		}

		return resolve(true);
	});

export default image;
