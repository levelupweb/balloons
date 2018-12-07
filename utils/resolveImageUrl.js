import { getStorageUrl } from "./";

export const resolveImageUrl = imageUrl => {
	if (imageUrl) {
		return getStorageUrl(imageUrl);
	}

	return require("@static/white-image.png");
};

export default resolveImageUrl;
