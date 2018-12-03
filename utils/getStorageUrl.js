import { getEnvConfig } from "@utils";

const envConfig = getEnvConfig();

export const getStorageUrl = key => `${envConfig.url}/storage/${key}`;

export default getStorageUrl;
