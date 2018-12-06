import { Sale } from "../model";

export const createSale = sale => Sale.create(sale);

export default createSale;
