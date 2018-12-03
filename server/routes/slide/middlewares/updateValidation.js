import { check } from "express-validator/check";
import * as consts from "@consts/slide";
import * as validation from "../validation";

export const updateValidation = [
	check(consts.SLIDE_TITLE)
		.optional()
		.custom(validation.title),
	check(consts.SLIDE_DESCRIPTION)
		.optional()
		.custom(validation.description),
	check(consts.SLIDE_IMAGE_URL)
		.optional()
		.custom(validation.image),
	check(consts.SLIDE_ACTION_URL)
		.optional()
		.isURL()
		.withMessage("Ссылка на страницу введена неверно")
];

export default updateValidation;
