export const image = value =>
	new Promise((resolve, reject) => {
		if (!value) {
			return reject("Поле 'Ссылка на изображение' не заполнено");
		}

		if (typeof value !== "string") {
			return reject("Поле 'Ссылка на изображение' заполнено некорректно");
		}

		return resolve(true);
	});

export default image;
