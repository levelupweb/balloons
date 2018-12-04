import React from "react";
import PropTypes from "prop-types";
import { Dropdown } from "semantic-ui-react";
import { CalculatorContext } from "../../context";
import { CALCULATOR_PARAM_SIDES } from "../../consts";
import { sides } from "./sides";

const SidesSelector = ({ side, handleSides }) => (
	<Dropdown
		placeholder="Количество сторон"
		name={CALCULATOR_PARAM_SIDES}
		selection
		fluid
		value={side}
		onChange={(_, { value }) => handleSides(value)}
		options={sides}
	/>
);

SidesSelector.propTypes = {
	side: PropTypes.string,
	handleSides: PropTypes.func.isRequired
};

const SidesSelectorWithContext = props => (
	<CalculatorContext.Consumer>
		{ctx => (
			<SidesSelector
				{...props}
				side={ctx.params[CALCULATOR_PARAM_SIDES]}
				handleSides={nextType =>
					ctx.handleParams(params => ({
						...params,
						[CALCULATOR_PARAM_SIDES]: nextType
					}))
				}
			/>
		)}
	</CalculatorContext.Consumer>
);

export default SidesSelectorWithContext;
