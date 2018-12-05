import { check } from "express-validator/check";
import * as consts from "@consts/category";
import * as validation from "../validation";

export const createValidation = [
	check(consts.CATEGORY_TITLE).custom(validation.title),
	check(consts.CATEGORY_DISPLAY_HEADER).custom(validation.displayHeader)
];

export default createValidation;
