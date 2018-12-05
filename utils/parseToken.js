import { TOKEN } from "@consts/_common";
import cookies from "js-cookie";

export const parseToken = req => {
	if (req) {
		return req && req.cookies && req.cookies[TOKEN];
	}
	return cookies.get(TOKEN);
};
