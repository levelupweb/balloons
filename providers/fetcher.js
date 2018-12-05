import React from "react";
import PropTypes from "prop-types";
import { withAsyncSetState, createAxios } from "@utils";
import { AuthContext } from "./auth";

export const FetcherContext = React.createContext();

class FetcherProviderClass extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			fetcher: props.axiosInstance
		};
	}

	componentDidUpdate = prevProps => {
		const { token } = this.props;

		if (prevProps.token === null && prevProps.token !== token) {
			this.setState({
				fetcher: createAxios(token)
			});
		}
	};

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
	axiosInstance: PropTypes.func.isRequired,
	user: PropTypes.object
};

FetcherProviderClass.defaultProps = {
	token: null,
	user: null
};

const FetcherProviderClassWithAsyncSetState = withAsyncSetState(
	FetcherProviderClass
);

const FetcherProviderClassWithAuthContext = props => (
	<AuthContext.Consumer>
		{ctx => (
			<FetcherProviderClassWithAsyncSetState {...props} token={ctx.token} />
		)}
	</AuthContext.Consumer>
);

export const FetcherProvider = FetcherProviderClassWithAuthContext;
