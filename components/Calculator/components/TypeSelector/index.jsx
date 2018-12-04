import React from "react";
import PropTypes from "prop-types";
import { Dropdown } from "semantic-ui-react";
import { CalculatorContext } from "../../context";
import { CALCULATOR_PARAM_TYPE } from "../../consts";
import { types } from "./types";

const TypeSelector = ({ type, handleType }) => (
	<Dropdown
		placeholder="Выберите тип"
		name={CALCULATOR_PARAM_TYPE}
		selection
		fluid
		value={type}
		onChange={(_, { value }) => handleType(value)}
		options={types}
	/>
);

TypeSelector.propTypes = {
	type: PropTypes.string,
	handleType: PropTypes.func.isRequired
};

const TypeSelectorWithContext = props => (
	<CalculatorContext.Consumer>
		{ctx => (
			<TypeSelector
				{...props}
				type={ctx.params[CALCULATOR_PARAM_TYPE]}
				handleType={nextType =>
					ctx.handleParams(params => ({
						...params,
						[CALCULATOR_PARAM_TYPE]: nextType
					}))
				}
			/>
		)}
	</CalculatorContext.Consumer>
);

export default TypeSelectorWithContext;
