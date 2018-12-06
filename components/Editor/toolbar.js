export const toolbar = uploadCallback => ({
	options: [
		"inline",
		"blockType",
		"fontSize",
		"list",
		"textAlign",
		"link",
		"embedded",
		"emoji",
		"image",
		"remove",
		"history"
	],
	image: {
		urlEnabled: false,
		uploadCallback
	}
});
