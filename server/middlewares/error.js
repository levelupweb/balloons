// eslint-disable-next-line no-unused-vars
export const error = (err, req, res, next) => {
	// eslint-disable-next-line no-console
	let response = "Неизвестная ошибка сервера";
	if (typeof err.message === "string") {
		response = err.message;
	}

	res.locals.message = response;
	res.locals.error = err.error || new Error(response);
	res.status(500).json(response);
};

export default error;
