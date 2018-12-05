export const parseParams = (req, _, next) => {
	req.parsedParams = {
		skip: +req.query.skip || 0,
		limit: +req.query.limit || 10
	};

	return next();
};

export default parseParams;
