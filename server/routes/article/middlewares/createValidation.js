import { check } from "express-validator/check";
import * as consts from "@consts/article";
import * as validation from "../validation";

export const createValidation = [
	check(consts.ARTICLE_TITLE).custom(validation.title),
	check(consts.ARTICLE_CONTENT).custom(validation.content),
	check(consts.ARTICLE_CATEGORY)
		.optional()
		.custom(validation.category)
];

export default createValidation;
