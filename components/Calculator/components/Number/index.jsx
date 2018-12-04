import React from "react";
import PropTypes from "prop-types";
import { Input } from "semantic-ui-react";
import { CalculatorContext } from "../../context";
import { CALCULATOR_PARAM_NUMBER } from "../../consts";

const NumberOfBalloons = ({ number, handleNumbers }) => (
	<Input
		type="number"
		placeholder="Введите число"
		fluid
		max={1000000}
		min={1}
		value={parseFloat(number)}
		onChange={(_, { value }) => handleNumbers(value)}
	/>
);

NumberOfBalloons.propTypes = {
	number: PropTypes.string,
	handleNumbers: PropTypes.func.isRequired
};

const NumberOfBalloonsWithContext = props => (
	<CalculatorContext.Consumer>
		{ctx => (
			<NumberOfBalloons
				{...props}
				number={ctx.params[CALCULATOR_PARAM_NUMBER]}
				handleNumbers={value =>
					ctx.handleParams(params => ({
						...params,
						[CALCULATOR_PARAM_NUMBER]: value
					}))
				}
			/>
		)}
	</CalculatorContext.Consumer>
);

export default NumberOfBalloonsWithContext;
