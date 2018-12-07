import {
	CALLBACK_NAME,
	CALLBACK_MESSAGE,
	CALLBACK_PHONE
} from "@consts/callback";

export const getDefaultMessage = () => ({
	[CALLBACK_NAME]: "",
	[CALLBACK_MESSAGE]: "",
	[CALLBACK_PHONE]: ""
});
