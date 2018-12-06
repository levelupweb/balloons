import { Sale } from "../model";

export const removeSale = query => Sale.findOneAndDelete(query);

export default removeSale;
