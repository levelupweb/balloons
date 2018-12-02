import jwt from "jsonwebtoken";

export const createToken = (payload, options = {}) =>
	new Promise((resolve, reject) => {
		try {
			resolve(jwt.sign(payload, process.env.SECRET, options));
		} catch (error) {
			reject(error);
		}
	});

export default createToken;
