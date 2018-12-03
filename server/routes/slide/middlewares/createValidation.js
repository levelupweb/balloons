import { check } from "express-validator/check";
import * as consts from "@consts/slide";
import * as validation from "../validation";

export const createValidation = [
	check(consts.SLIDE_TITLE).custom(validation.title),
	check(consts.SLIDE_DESCRIPTION).custom(validation.description),
	check(consts.SLIDE_IMAGE_URL).custom(validation.image),
	check(consts.SLIDE_ACTION_URL)
		.optional()
		.isURL()
		.withMessage("Ссылка введена неверно")
];

export default createValidation;
