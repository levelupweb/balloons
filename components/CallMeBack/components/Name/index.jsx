import React from "react";
import PropTypes from "prop-types";
import { Input, Popup } from "semantic-ui-react";
import { CALLBACK_NAME } from "@consts/callback";
import { CallMeBackContext } from "../../context";

const Name = ({ onChange, value, error }) => (
	<Popup
		open={!!error}
		trigger={
			<Input
				fluid
				type="text"
				value={value}
				placeholder="Как к вам обращаться?"
				onChange={(_, { value }) => onChange(value)}
				error={!!error}
			/>
		}
	>
		{error}
	</Popup>
);

Name.propTypes = {
	onChange: PropTypes.func.isRequired,
	value: PropTypes.string.isRequired,
	error: PropTypes.string
};

Name.defaultProps = {
	error: null
};

const NameWithCallMeBackContext = props => (
	<CallMeBackContext.Consumer>
		{ctx => (
			<Name
				{...props}
				error={ctx.getTypeErrorMessage(CALLBACK_NAME)}
				value={ctx.message[CALLBACK_NAME]}
				onChange={value =>
					ctx.handleMessage({
						[CALLBACK_NAME]: value
					})
				}
			/>
		)}
	</CallMeBackContext.Consumer>
);

export default NameWithCallMeBackContext;
