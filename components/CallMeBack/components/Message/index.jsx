import React from "react";
import PropTypes from "prop-types";
import { TextArea, Popup } from "semantic-ui-react";
import { CALLBACK_MESSAGE } from "@consts/callback";
import { CallMeBackContext } from "../../context";

const Message = ({ onChange, value, error }) => (
	<Popup
		open={!!error}
		trigger={
			<TextArea
				autoHeight
				rows={2}
				fluid
				type="text"
				value={value}
				placeholder="В этом поле вы можете ввести дополнительное сообщение менеджеру"
				onChange={(_, { value }) => onChange(value)}
				error={!!error}
			/>
		}
	>
		{error}
	</Popup>
);

Message.propTypes = {
	onChange: PropTypes.func.isRequired,
	value: PropTypes.string.isRequired,
	error: PropTypes.string
};

Message.defaultProps = {
	error: null
};

const MessageWithCallMeBackContext = props => (
	<CallMeBackContext.Consumer>
		{ctx => (
			<Message
				{...props}
				error={ctx.getTypeErrorMessage(CALLBACK_MESSAGE)}
				value={ctx.message[CALLBACK_MESSAGE]}
				onChange={value =>
					ctx.handleMessage({
						[CALLBACK_MESSAGE]: value
					})
				}
			/>
		)}
	</CallMeBackContext.Consumer>
);

export default MessageWithCallMeBackContext;
