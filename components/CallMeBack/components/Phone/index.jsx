import React from "react";
import PropTypes from "prop-types";
import { Input, Popup } from "semantic-ui-react";
import { CALLBACK_PHONE } from "@consts/callback";
import { CallMeBackContext } from "../../context";

const Phone = ({ onChange, value, error }) => (
	<Popup
		open={!!error}
		trigger={
			<Input
				type="tel"
				fluid
				value={value}
				placeholder="+7"
				onChange={(_, { value }) => onChange(value)}
				error={!!error}
			/>
		}
	>
		{error}
	</Popup>
);

Phone.propTypes = {
	onChange: PropTypes.func.isRequired,
	value: PropTypes.string.isRequired,
	error: PropTypes.string
};

Phone.defaultProps = {
	error: null
};

const PhoneWithCallMeBackContext = props => (
	<CallMeBackContext.Consumer>
		{ctx => (
			<Phone
				{...props}
				error={ctx.getTypeErrorMessage(CALLBACK_PHONE)}
				value={ctx.message[CALLBACK_PHONE]}
				onChange={value =>
					ctx.handleMessage({
						[CALLBACK_PHONE]: value
					})
				}
			/>
		)}
	</CallMeBackContext.Consumer>
);

export default PhoneWithCallMeBackContext;
