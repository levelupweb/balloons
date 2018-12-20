import { check } from "express-validator/check";
import * as consts from "@consts/portfolio";
import * as validation from "../validation";

export const createValidation = [
	check(consts.PORTFOLIO_IMAGES).custom(validation.images),
	check(consts.PORTFOLIO_TITLE).custom(validation.title),
	check(consts.PORTFOLIO_DESCRIPTION).custom(validation.description)
];

export default createValidation;
