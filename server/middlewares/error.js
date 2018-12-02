// eslint-disable-next-line no-unused-vars
export const error = (err, req, res, next) => {
	// eslint-disable-next-line no-console
	let response = "Неизвестная ошибка сервера";

	if (typeof err.message === "string") {
		response = err.message;
	}

	res.locals.message = err.message;
	res.locals.error = err.error || new Error(err.message);
	res.status(500).json(response);
};

export default error;
