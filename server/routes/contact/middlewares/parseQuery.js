import * as consts from "@consts/contact";
import * as routeConsts from "../consts";

export const parseQuery = (req, _, next) => {
	req.parsedQuery = Object.keys(req.query).reduce((prev, current) => {
		if (current === routeConsts.CONTACT_QUERY_CONTACT_ID) {
			return {
				...prev,
				_id: req.query[current]
			};
		} else if (current === routeConsts.CONTACT_QUERY_NAME) {
			return {
				...prev,
				[consts.CONTACT_NAME]: req.query[current]
			};
		}
		return prev;
	}, {});
	return next();
};

export default parseQuery;
