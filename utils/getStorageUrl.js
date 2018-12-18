import { getEnvConfig } from "@utils";

const envConfig = getEnvConfig();

export const getStorageUrl = key => {
	if (key.indexOf("http") === -1) {
		return `${envConfig.url}/storage/${key}`;
	}
	return key;
};

export default getStorageUrl;
