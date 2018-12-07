import { check } from "express-validator/check";
import * as consts from "@consts/sale";
import * as validation from "../validation";

export const createValidation = [
	check(consts.SALE_TITLE).custom(validation.title),
	check(consts.SALE_IMAGE)
		.optional()
		.custom(validation.image),
	check(consts.SALE_DESCRIPTION).custom(validation.description),
	check(consts.SALE_END_DATE)
		.optional()
		.custom(validation.endDate),
	check(consts.SALE_DISCOUNT)
		.optional()
		.custom(validation.discount)
];

export default createValidation;
