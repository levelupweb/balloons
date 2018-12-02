import React from "react";
import axios from "axios";
import cookies from "js-cookie";
import PropTypes from "prop-types";
import { TOKEN } from "@consts/_common";
import { withAsyncSetState, getApiUrl } from "@utils";

export const FetcherContext = React.createContext();

class FetcherProviderClass extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			fetcher: this.createAxios()
		};
	}

	createAxios = () => {
		const { token } = this.props;

		return axios.create({
			baseURL: getApiUrl(),
			headers: { authorization: token || cookies.get(TOKEN) }
		});
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
	token: PropTypes.string
};

FetcherProviderClass.defaultProps = {
	token: null
};

const FetcherProviderClassWithAsyncSetState = withAsyncSetState(
	FetcherProviderClass
);

export const FetcherProvider = FetcherProviderClassWithAsyncSetState;
