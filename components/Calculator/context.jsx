import React from "react";
import PropTypes from "prop-types";
import { withAsyncSetState } from "@utils";

import {
	CALCULATOR_PARAM_COLOR,
	CALCULATOR_PARAM_LOGO_COLORS,
	CALCULATOR_PARAM_LOGO_COLORS_2
} from "./consts";

export const CalculatorContext = React.createContext();

class CalculatorProviderClass extends React.Component {
	state = {
		params: {
			[CALCULATOR_PARAM_COLOR]: "#e6652c",
			[CALCULATOR_PARAM_LOGO_COLORS]: ["#3998cb"],
			[CALCULATOR_PARAM_LOGO_COLORS_2]: ["#3998cb"]
		}
	};

	handleParams = data =>
		this.asyncSetState({
			params: {
				...this.state.params,
				...data(this.state.params)
			}
		});

	render = () => (
		<CalculatorContext.Provider
			value={{
				params: this.state.params,
				handleParams: this.handleParams
			}}
		>
			{this.props.children}
		</CalculatorContext.Provider>
	);
}

CalculatorProviderClass.propTypes = {
	children: PropTypes.element.isRequired
};

const CalculatorProviderClassWithAsyncSetState = withAsyncSetState(
	CalculatorProviderClass
);

export const CalculatorProvider = CalculatorProviderClassWithAsyncSetState;
