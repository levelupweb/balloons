import * as routeConsts from "../consts";

export const parseQuery = (req, _, next) => {
	req.parsedQuery = Object.keys(req.query).reduce((prev, current) => {
		if (current === routeConsts.SALE_MODEL_QUERY_SALE_ID) {
			return {
				...prev,
				_id: req.query[current]
			};
		}
		return prev;
	}, {});

	return next();
};

export default parseQuery;
