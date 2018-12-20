import { getStorageUrl } from "./";

export const resolveImageUrl = imageUrl => {
	if (!imageUrl) {
		return require("@static/white-image.png");
	}

	if (imageUrl.indexOf("http") !== -1) {
		return imageUrl;
	}

	return getStorageUrl(imageUrl);
};

export default resolveImageUrl;
