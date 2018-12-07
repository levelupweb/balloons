import { check } from "express-validator/check";
import * as consts from "@consts/callback";
import * as validation from "../validation";

export const createValidation = [
	check(consts.CALLBACK_NAME).custom(validation.name),
	check(consts.CALLBACK_PHONE).custom(validation.phone),
	check(consts.CALLBACK_MESSAGE)
		.optional()
		.custom(validation.message)
];

export default createValidation;
