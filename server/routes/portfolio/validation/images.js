export const images = value =>
	new Promise((resolve, reject) => {
		if (!value) {
			return reject("Поле 'Изображения' заполнено некорректно");
		}

		if (!Array.isArray(value) || value.some(item => typeof item !== "string")) {
			return reject("Поле 'Изображения' заполнено некорректно");
		}

		return resolve(true);
	});

export default images;
