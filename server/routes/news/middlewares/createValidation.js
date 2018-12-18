import { check } from "express-validator/check";
import * as consts from "@consts/news";
import * as validation from "../validation";

export const createValidation = [
	check(consts.NEWS_TITLE).custom(validation.title),
	check(consts.NEWS_IMAGE)
		.optional()
		.custom(validation.image),
	check(consts.NEWS_CONTENT).custom(validation.content),
	check(consts.NEWS_DESCRIPTION).custom(validation.description)
];

export default createValidation;
