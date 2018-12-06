import React from "react";
import PropTypes from "prop-types";
import { Form } from "semantic-ui-react";
import Margin from "@components/Margin";
import Field from "./components/Field";
import Plot from "./components/Plot";
import Block from "@components/Block";
import Number from "./components/Number";
import TypeSelector from "./components/TypeSelector";
import ColorPicker from "./components/ColorPicker";
import MetalSelector from "./components/MetalSelector";
import Price from "./components/Price";
import DiameterSelector from "./components/DiameterSelector";
import styles from "./styles.less";
import { CalculatorProvider, CalculatorContext } from "./context";
import { CALCULATOR_PARAM_COLOR, CALCULATOR_PARAM_LOGO } from "./consts";

const Calculator = ({ params, handleParams, hasLogo }) => (
	<div className={styles.wrapper}>
		<div className={styles.plot}>
			<Plot />
		</div>

		<Block className={styles.selectors}>
			<Form>
				<Margin bottom>
					<Field title="Тип шара" description="Обязательное поле">
						<TypeSelector />
					</Field>
				</Margin>
				<Margin bottom>
					<Field title="Цвет шара" description="Обязательное поле">
						<ColorPicker
							fluid
							onChange={hex =>
								handleParams(params => ({
									...params,
									[CALCULATOR_PARAM_COLOR]: hex
								}))
							}
							color={params[CALCULATOR_PARAM_COLOR]}
						/>
					</Field>
				</Margin>
				<Margin bottom>
					<Field title="Диаметр" description="Обязательное поле">
						<DiameterSelector />
					</Field>
				</Margin>
				<Margin>
					<Field title="Тираж" description="Обязательное поле">
						<Number />
					</Field>
				</Margin>
				{hasLogo && (
					<Margin top>
						<Field title="Стороны печати" description="Обязательное поле">
							<MetalSelector />
						</Field>
					</Margin>
				)}
				<Margin top>
					<Price />
				</Margin>
			</Form>
		</Block>
	</div>
);

Calculator.propTypes = {
	handleParams: PropTypes.func.isRequired,
	params: PropTypes.object.isRequired,
	hasLogo: PropTypes.bool.isRequired
};

const CalculatorWithProvider = props => (
	<CalculatorProvider>
		<CalculatorContext.Consumer>
			{ctx => (
				<Calculator
					{...props}
					params={ctx.params}
					handleParams={ctx.handleParams}
					hasLogo={!!ctx.params[CALCULATOR_PARAM_LOGO]}
				/>
			)}
		</CalculatorContext.Consumer>
	</CalculatorProvider>
);

export default CalculatorWithProvider;
