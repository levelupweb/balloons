import { getEnvConfig } from ".";

export const getApiUrl = (suffix = "") => `${getEnvConfig().url}/api${suffix}`;
