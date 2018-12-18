import React from "react";
import PropTypes from "prop-types";
import DefaultContainer from "@containers/Default";
import Error from "@components/Error";

class ErrorWrapper extends React.Component {
	static getInitialProps({ res, err }) {
		const statusCode = res ? res.statusCode : err ? err.statusCode : null;

		return { statusCode };
	}

	render() {
		const { statusCode } = this.props;

		return (
			<DefaultContainer centered>
				<Error statusCode={statusCode} />
			</DefaultContainer>
		);
	}
}

ErrorWrapper.propTypes = {
	statusCode: PropTypes.number
};

ErrorWrapper.defaultProps = {
	statusCode: null
};

export default ErrorWrapper;
