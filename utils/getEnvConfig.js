import config from "@root/config";

export const getEnvConfig = env => {
	if (env !== "production" && env !== "development") {
		throw new Error("Wrong NODE_ENV variable");
	}

	return config[env];
};

export default getEnvConfig;
