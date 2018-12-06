import { check } from "express-validator/check";
import * as consts from "@consts/sale";
import * as validation from "../validation";

export const updateValidation = [
	check(consts.SALE_TITLE)
		.optional()
		.custom(validation.title),
	check(consts.SALE_DESCRIPTION)
		.optional()
		.custom(validation.description),
	check(consts.SALE_IMAGE)
		.optional()
		.custom(validation.image),
	check(consts.SALE_END_DATE)
		.optional()
		.custom(validation.endDate)
];

export default updateValidation;
