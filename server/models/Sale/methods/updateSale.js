import { Sale } from "../model";

export const updateSale = (query, data) =>
	Sale.findOneAndUpdate(query, data, { new: true });

export default updateSale;
