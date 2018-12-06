import { User } from "@server/models";
import { verifyToken, createError } from "@server/utils";

export const auth = (required = true) => (req, _, next) => {
	const token = req.headers.authorization;

	if (token) {
		return verifyToken(token)
			.then(decoded => {
				req.userId = decoded.userId;
				return User.getUser({
					_id: decoded.userId
				})
					.then(user => {
						if (!user && required) {
							return next(createError("Пользователь не найден"));
						}
						req.user = user;
						return next();
					})
					.catch(() =>
						required ? next(createError("Неверный токен")) : next()
					);
			})
			.catch(() =>
				required
					? next(createError("Авторизация не удалась. Попробуйте позже"))
					: next()
			);
	}

	if (required) {
		return next(createError("Токен не предоставлен"));
	} else {
		return next();
	}
};

export default auth;
