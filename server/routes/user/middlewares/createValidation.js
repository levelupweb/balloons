import { check } from "express-validator/check";
import * as consts from "@consts/user";
import * as validation from "../validation";

export const createValidation = [
	check(consts.USER_LOGIN).custom(validation.login),
	check(consts.USER_PASSWORD).custom(validation.password)
];

export default createValidation;
