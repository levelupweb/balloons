import axios from "axios";
import { getApiUrl } from ".";

export const createAxios = token =>
	axios.create({
		baseURL: getApiUrl(),
		headers: { authorization: token }
	});
