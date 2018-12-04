import React from "react";
import PropTypes from "prop-types";
import { Dropdown } from "semantic-ui-react";
import { CalculatorContext } from "../../context";
import { CALCULATOR_PARAM_DIAMETER } from "../../consts";
import { diameters } from "./diameters";

const DiameterSelector = ({ diameter, handleDiameter }) => (
	<Dropdown
		placeholder="Выберите диаметр шара"
		name={CALCULATOR_PARAM_DIAMETER}
		selection
		fluid
		value={diameter}
		onChange={(_, { value }) => handleDiameter(value)}
		options={diameters}
	/>
);

DiameterSelector.propTypes = {
	diameter: PropTypes.string,
	handleDiameter: PropTypes.func.isRequired
};

const DiameterSelectorWithContext = props => (
	<CalculatorContext.Consumer>
		{ctx => (
			<DiameterSelector
				{...props}
				diameter={ctx.params[CALCULATOR_PARAM_DIAMETER]}
				handleDiameter={value =>
					ctx.handleParams(params => ({
						...params,
						[CALCULATOR_PARAM_DIAMETER]: value
					}))
				}
			/>
		)}
	</CalculatorContext.Consumer>
);

export default DiameterSelectorWithContext;
