import React from "react";
import { Message } from "semantic-ui-react";
import { Heading, Paragraph } from "@components/Typography";
import { CalculatorContext } from "../../context";

import {
	CALCULATOR_PARAM_DIAMETER,
	CALCULATOR_DIAMETER_14,
	CALCULATOR_PARAM_NUMBER
} from "../../consts";

const Price = () => (
	<CalculatorContext.Consumer>
		{ctx => {
			if (ctx.logoCount > 0) {
				if (
					ctx.params[CALCULATOR_PARAM_DIAMETER] === CALCULATOR_DIAMETER_14 &&
					ctx.params[CALCULATOR_PARAM_NUMBER] < 100
				) {
					return (
						<Message info>
							<Message.Header>Внимание</Message.Header>
							Для шаров диаметром 35см. минимальный тираж - 100 ед.
						</Message>
					);
				}
				return (
					<React.Fragment>
						<Paragraph>Итоговая цена за заказ составляет:</Paragraph>
						<Heading as="p" size={2}>
							{ctx.price} руб.
						</Heading>
					</React.Fragment>
				);
			}

			return (
				<Message info>
					<Message.Header>Внимание</Message.Header>
					Для отображения цены сперва загрузите логотип
				</Message>
			);
		}}
	</CalculatorContext.Consumer>
);

export default Price;
