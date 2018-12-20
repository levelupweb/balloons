import { Portfolio } from "@server/models";
import { createError } from "@server/utils";

export const isPortfolioExist = (req, _, next) =>
	Portfolio.findOne(req.parsedQuery)
		.then(news => {
			if (!news || !news._id) {
				return next(createError("Не удалось найти работу"));
			}

			return next();
		})
		.catch(err =>
			next(
				createError("Не удалось найти работу. Попробуйте другой запрос", err)
			)
		);

export default isPortfolioExist;
