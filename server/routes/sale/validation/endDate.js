const ISODate = date => {
	const re = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+Z/;
	return re.test(date);
};

export const endDate = value =>
	new Promise((resolve, reject) => {
		if (!value) {
			return reject("Поле 'Дата окончания' не заполнено");
		}

		if (typeof value !== "string" || !ISODate(value)) {
			return reject("Поле 'Дата окончания' заполнено некорректно");
		}

		return resolve(true);
	});

export default endDate;
