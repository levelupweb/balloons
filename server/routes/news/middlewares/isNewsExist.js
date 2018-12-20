import { News } from "@server/models";
import { createError } from "@server/utils";

export const isNewsExist = (req, _, next) =>
	News.findOne(req.parsedQuery)
		.then(news => {
			if (!news || !news._id) {
				return next(createError("Не удалось найти новость"));
			}

			return next();
		})
		.catch(err =>
			next(
				createError("Не удалось найти новость. Попробуйте другой запрос", err)
			)
		);

export default isNewsExist;
