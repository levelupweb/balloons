import React from "react";
import PropTypes from "prop-types";
import { Dropdown } from "semantic-ui-react";
import { CalculatorContext } from "../../context";
import { CALCULATOR_PARAM_METAL } from "../../consts";
import { metals } from "./metals";

const MetalSelector = ({ metal, handleMetal }) => (
	<Dropdown
		placeholder="Металлизированная краска"
		name={CALCULATOR_PARAM_METAL}
		selection
		fluid
		value={metal}
		onChange={(_, { value }) => handleMetal(value)}
		options={metals}
	/>
);

MetalSelector.propTypes = {
	metal: PropTypes.string,
	handleMetal: PropTypes.func.isRequired
};

const MetalSelectorWithContext = props => (
	<CalculatorContext.Consumer>
		{ctx => (
			<MetalSelector
				{...props}
				metal={ctx.params[CALCULATOR_PARAM_METAL]}
				handleMetal={metal =>
					ctx.handleParams(params => ({
						...params,
						[CALCULATOR_PARAM_METAL]: metal
					}))
				}
			/>
		)}
	</CalculatorContext.Consumer>
);

export default MetalSelectorWithContext;
