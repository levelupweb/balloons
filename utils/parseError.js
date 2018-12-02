const isHtml = response =>
	response.headers["content-type"].indexOf("html") !== -1;

export const parseError = axiosResponse => {
	if (!axiosResponse) {
		return "Неизвестная ошибка сервера или клиента";
	}

	if (typeof axiosResponse === "string") {
		return axiosResponse;
	}

	if (axiosResponse.response) {
		if (axiosResponse.response.status === 422) {
			return axiosResponse.response.data.errors;
		}

		if (typeof axiosResponse.response.data === "string") {
			if (isHtml(axiosResponse.response)) {
				return "Неизвестная ошибка сервера. Попробуйте позже";
			}
			return axiosResponse.response.data;
		}

		return "Неизвестная ошибка сервера";
	}

	return "Неизвестная ошибка клиента";
};

export default parseError;
