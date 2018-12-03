import React from "react";
import PropTypes from "prop-types";
import { withAsyncSetState } from "@utils";

export const UIContext = React.createContext();

class UIProviderClass extends React.Component {
	state = {
		error: this.props.error,
		ui: this.props.ui
	};

	render = () => (
		<UIContext.Provider
			value={{
				error: this.state.error,
				ui: this.state.ui
			}}
		>
			{this.props.children}
		</UIContext.Provider>
	);
}

UIProviderClass.propTypes = {
	children: PropTypes.any.isRequired,
	error: PropTypes.string,
	ui: PropTypes.any
};

UIProviderClass.defaultProps = {
	ui: null,
	error: null
};

const UIProviderClassWithAsyncSetState = withAsyncSetState(UIProviderClass);

export const UIProvider = UIProviderClassWithAsyncSetState;
