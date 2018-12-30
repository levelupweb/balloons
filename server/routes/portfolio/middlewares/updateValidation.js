import { check } from "express-validator/check";
import * as consts from "@consts/portfolio";
import * as validation from "../validation";

export const updateValidation = [
	check(consts.PORTFOLIO_IMAGES)
		.optional()
		.custom(validation.images),
	check(consts.PORTFOLIO_TITLE)
		.optional()
		.custom(validation.title),
	check(consts.PORTFOLIO_DESCRIPTION)
		.optional()
		.custom(validation.description)
];

export default updateValidation;
