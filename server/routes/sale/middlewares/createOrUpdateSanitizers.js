import { sanitizeBody } from "express-validator/filter";
import * as consts from "@consts/sale";

export const createOrUpdateSanitizers = [
	sanitizeBody(consts.SALE_DESCRIPTION).trim(),
	sanitizeBody(consts.SALE_IMAGE).trim(),
	sanitizeBody(consts.SALE_TITLE).trim()
];

export default createOrUpdateSanitizers;
