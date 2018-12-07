import React from "react";
import PropTypes from "prop-types";
import { Segment } from "semantic-ui-react";
import { CallMeBackContext } from "../../context";

const ErrorBox = ({ error }) => (
	<Segment inverted color="red">
		{error}
	</Segment>
);

ErrorBox.propTypes = {
	error: PropTypes.string.isRequired
};

const ErrorBoxWithCallMeBackContext = props => (
	<CallMeBackContext.Consumer>
		{ctx => <ErrorBox {...props} error={ctx.posting.error} />}
	</CallMeBackContext.Consumer>
);

export default ErrorBoxWithCallMeBackContext;
