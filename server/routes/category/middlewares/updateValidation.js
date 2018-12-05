import { check } from "express-validator/check";
import * as consts from "@consts/category";
import * as validation from "../validation";

export const updateValidation = [
	check(consts.CATEGORY_TITLE)
		.optional()
		.custom(validation.title),
	check(consts.CATEGORY_DISPLAY_HEADER)
		.optional()
		.custom(validation.displayHeader)
];

export default updateValidation;
