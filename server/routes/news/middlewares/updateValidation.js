import { check } from "express-validator/check";
import * as consts from "@consts/news";
import * as validation from "../validation";

export const updateValidation = [
	check(consts.NEWS_TITLE)
		.optional()
		.custom(validation.title),
	check(consts.NEWS_IMAGE)
		.optional()
		.custom(validation.image),
	check(consts.NEWS_CONTENT)
		.optional()
		.custom(validation.content),
	check(consts.NEWS_DESCRIPTION)
		.optional()
		.custom(validation.description)
];

export default updateValidation;
