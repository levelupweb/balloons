import React from "react";
import PropTypes from "prop-types";
import { Input } from "semantic-ui-react";
import { CalculatorContext } from "../../context";

import {
	CALCULATOR_PARAM_NUMBER,
	CALCULATOR_PARAM_DIAMETER,
	CALCULATOR_DIAMETER_12
} from "../../consts";

class NumberOfBalloons extends React.Component {
	state = {
		ref: null
	};

	componentDidUpdate = prevProps => {
		const { number } = this.props;
		const { ref } = this.state;

		if (number !== prevProps.number && ref) {
			ref.value = number;
		}
	};

	handleRef = ref => this.setState({ ref });

	handleChange = (_, { value }) => {
		const { handleNumbers } = this.props;

		handleNumbers(value);
	};

	render = () => {
		const { number, diameter } = this.props;

		return (
			<Input
				type="number"
				placeholder="Введите число"
				innerRef={this.handleRef}
				fluid
				max={1000000}
				min={diameter === CALCULATOR_DIAMETER_12 ? 100 : 1}
				value={parseFloat(number)}
				onChange={this.handleChange}
			/>
		);
	};
}

NumberOfBalloons.propTypes = {
	number: PropTypes.string,
	handleNumbers: PropTypes.func.isRequired,
	diameter: PropTypes.number
};

const NumberOfBalloonsWithContext = props => (
	<CalculatorContext.Consumer>
		{ctx => (
			<NumberOfBalloons
				{...props}
				number={ctx.params[CALCULATOR_PARAM_NUMBER]}
				diameter={ctx.params[CALCULATOR_PARAM_DIAMETER]}
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
