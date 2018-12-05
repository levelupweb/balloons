import { check } from "express-validator/check";
import * as consts from "@consts/contact";
import * as validation from "../validation";

export const createValidation = [
	check(consts.CONTACT_NAME).custom(validation.name),
	check(consts.CONTACT_PHONE).custom(validation.phone),
	check(consts.CONTACT_MESSAGE).custom(validation.message),
	check(consts.CONTACT_AGREEMENT).custom(validation.agreement)
];

export default createValidation;
