import { check } from "express-validator/check";
import * as consts from "@consts/calculation";
import * as validation from "../validation";

export const createValidation = [
	check(consts.CALCULATION_PARAMS).custom(validation.params),
	check(consts.CALCULATION_TOTAL).custom(validation.total)
];

export default createValidation;
