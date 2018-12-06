import { Sale } from "../model";

const defaultParams = {
	skip: 0,
	limit: 10
};

export const getSales = (query, params) =>
	Sale.find(query, null, {
		...defaultParams,
		...params
	});

export default getSales;
