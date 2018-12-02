import config from "@root/config";
import { isBrowser } from "./isBrowser";

export const getEnvConfig = () => {
	if (isBrowser()) {
		return window.config;
	}

	const env = process.env && process.env.NODE_ENV;

	if (!env) {
		throw new Error("NODE_ENV is not set");
	}

	if (env !== "production" && env !== "development") {
		throw new Error("Wrong NODE_ENV variable");
	}

	return config[env];
};

export default getEnvConfig;
