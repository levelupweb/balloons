import { Contact } from "../model";

const defaultParams = {
	skip: 0,
	limit: 10
};

export const getContacts = (query, params) =>
	Contact.find(query, null, {
		...defaultParams,
		...params
	});

export default getContacts;
