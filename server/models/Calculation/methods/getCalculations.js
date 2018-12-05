import Calculation from "../model";

const defaultParams = {
	skip: 0,
	limit: 10
};

export const getCalculations = params =>
	Calculation.find({}, null, {
		...defaultParams,
		...params
	});

export default getCalculations;
