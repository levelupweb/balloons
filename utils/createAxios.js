import axios from "axios";
import { getApiUrl } from ".";

export const createAxios = token => {
	if (token) {
		return axios.create({
			baseURL: getApiUrl(),
			headers: { authorization: token }
		});
	}

	return axios.create({
		baseURL: getApiUrl()
	});
};
