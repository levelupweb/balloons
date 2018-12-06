import { Sale } from "./model";
import * as methods from "./methods";

Sale.createSale = methods.createSale;
Sale.getSales = methods.getSales;
Sale.removeSale = methods.removeSale;
Sale.updateSale = methods.updateSale;

export default Sale;
