import { Category } from "@server/models";

export const category = value =>
	new Promise((resolve, reject) => {
		if (!value) {
			return resolve();
		}

		if (typeof value !== "string") {
			return reject("Поле 'Категория' заполнено некорректно");
		}

		return Category.countDocuments({ _id: value })
			.then(count => {
				if (count > 0) {
					return resolve(true);
				}

				return reject("Категория не найдена в базе данных");
			})
			.catch(() => reject("Не удалось найти категорию"));
	});

export default category;
