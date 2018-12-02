import { check } from "express-validator/check";
import * as consts from "@consts/category";
import * as validation from "../validation";

export const updateValidation = [
	check(consts.CATEGORY_TITLE)
		.optional()
		.custom(validation.title)
];

export default updateValidation;
