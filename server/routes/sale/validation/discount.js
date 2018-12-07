export const discount = value =>
	new Promise((resolve, reject) => {
		if (!value) {
			return resolve();
		}

		if (typeof value !== "number") {
			return reject("Поле 'Скидка' заполнено некорректно");
		}

		if (parseFloat(value) < 1 || parseFloat(value) >= 100) {
			return reject("Поле 'Скидка' не может быть меньше 1 или больше 100");
		}

		return resolve(true);
	});

export default discount;
