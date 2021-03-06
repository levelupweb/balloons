import { check } from "express-validator/check";
import * as consts from "@consts/article";
import * as validation from "../validation";

export const updateValidation = [
	check(consts.ARTICLE_TITLE)
		.optional()
		.custom(validation.title),
	check(consts.ARTICLE_DESCRIPTION)
		.optional()
		.custom(validation.description),
	check(consts.ARTICLE_CONTENT)
		.optional()
		.custom(validation.content),
	check(consts.ARTICLE_CATEGORY)
		.optional()
		.custom(validation.category),
	check(consts.ARTICLE_DISPLAY_HEADER)
		.optional()
		.custom(validation.displayHeader)
];

export default updateValidation;
