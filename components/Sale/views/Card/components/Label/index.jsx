import React from "react";
import { SALE_DISCOUNT } from "@consts/sale";
import { Label } from "semantic-ui-react";
import { SaleContext } from "../../../../context";

const LabelWrapper = () => (
	<SaleContext.Consumer>
		{ctx => <Label color="red">Скидка {ctx.sale[SALE_DISCOUNT]}%</Label>}
	</SaleContext.Consumer>
);

export default LabelWrapper;
