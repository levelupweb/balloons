import React from "react";
import PropTypes from "prop-types";
import { withAsyncSetState } from "@utils";

export const FetcherContext = React.createContext();

class FetcherProviderClass extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			fetcher: props.axiosInstance
		};
	}

	render = () => (
		<FetcherContext.Provider
			value={{
				fetcher: this.state.fetcher
			}}
		>
			{this.props.children}
		</FetcherContext.Provider>
	);
}

FetcherProviderClass.propTypes = {
	children: PropTypes.any.isRequired,
	token: PropTypes.string,
	axiosInstance: PropTypes.func.isRequired
};

FetcherProviderClass.defaultProps = {
	token: null
};

const FetcherProviderClassWithAsyncSetState = withAsyncSetState(
	FetcherProviderClass
);

export const FetcherProvider = FetcherProviderClassWithAsyncSetState;
