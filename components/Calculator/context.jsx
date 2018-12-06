import React from "react";
import PropTypes from "prop-types";
import { withAsyncSetState } from "@utils";
import { defineType, getLogoCount, defineBasicPrice } from "./utils";

import {
	CALCULATOR_PARAM_COLOR,
	CALCULATOR_PARAM_LOGO_COLORS,
	CALCULATOR_PARAM_LOGO_COLORS_2,
	CALCULATOR_PARAM_NUMBER,
	CALCULATOR_PARAM_DIAMETER,
	CALCULATOR_DIAMETER_14,
	CALCULATOR_PARAM_TYPE,
	CALCULATOR_PARAM_METAL,
	CALCULATOR_METAL_GOLD,
	CALCULATOR_METAL_SILVER,
	CALCULATOR_TYPE_PASTEL
} from "./consts";

export const CalculatorContext = React.createContext();

class CalculatorProviderClass extends React.Component {
	state = {
		params: {
			[CALCULATOR_PARAM_NUMBER]: 100,
			[CALCULATOR_PARAM_TYPE]: CALCULATOR_TYPE_PASTEL,
			[CALCULATOR_PARAM_COLOR]: "#e6652c",
			[CALCULATOR_PARAM_LOGO_COLORS]: ["#3998cb"],
			[CALCULATOR_PARAM_DIAMETER]: CALCULATOR_DIAMETER_14,
			[CALCULATOR_PARAM_LOGO_COLORS_2]: ["#3998cb"]
		}
	};

	componentDidUpdate = (_, prevState) => {
		const { params } = this.state;

		if (
			(params[CALCULATOR_PARAM_NUMBER] === 100 ||
				params[CALCULATOR_PARAM_NUMBER] === 1) &&
			prevState.params[CALCULATOR_PARAM_DIAMETER] !==
				params[CALCULATOR_PARAM_DIAMETER]
		) {
			if (params[CALCULATOR_PARAM_DIAMETER] === CALCULATOR_DIAMETER_14) {
				this.handleParams(() => ({
					[CALCULATOR_PARAM_NUMBER]: 100
				}));
			} else {
				this.handleParams(() => ({
					[CALCULATOR_PARAM_NUMBER]: 1
				}));
			}
		}
	};

	handleParams = data =>
		this.asyncSetState({
			params: {
				...this.state.params,
				...data(this.state.params)
			}
		});

	calculatePrice = () => {
		const { params } = this.state;

		let over = 0;
		let basicOver = 0;

		const number = params[CALCULATOR_PARAM_NUMBER];
		const colorsLength1 = params[CALCULATOR_PARAM_LOGO_COLORS].length;
		const colorsLength2 = params[CALCULATOR_PARAM_LOGO_COLORS_2].length;
		const colorsTotal = colorsLength1 + colorsLength2;

		const logoCount = getLogoCount(params);

		if (logoCount === 0) {
			return 0;
		}

		const type = defineType(params);
		const basicPrice = defineBasicPrice(type, number, params);

		/**
		 * metal factor
		 */

		if (
			params[CALCULATOR_PARAM_METAL] === CALCULATOR_METAL_GOLD ||
			params[CALCULATOR_PARAM_METAL] === CALCULATOR_METAL_SILVER
		) {
			basicOver += 0.5;
		}

		/**
		 * sides factor
		 */

		if (logoCount === 2) {
			over += 1000;
		}

		/**
		 * color factor
		 */

		if (logoCount > 0 && colorsTotal !== 2) {
			if (params[CALCULATOR_PARAM_DIAMETER] === CALCULATOR_DIAMETER_14) {
				over += 350 * colorsTotal;
			} else {
				over += 250 * colorsTotal;
			}
		}

		return Math.round((basicPrice + basicOver) * number) + over;
	};

	render = () => (
		<CalculatorContext.Provider
			value={{
				params: this.state.params,
				handleParams: this.handleParams,
				price: this.calculatePrice()
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
