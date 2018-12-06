import React from "react";
import { Heading } from "@components/Typography";
import { CalculatorContext } from "../../context";

const Price = () => (
	<CalculatorContext.Consumer>
		{ctx => (
			<Heading as="p" size={2}>
				{ctx.price} руб.
			</Heading>
		)}
	</CalculatorContext.Consumer>
);

export default Price;
