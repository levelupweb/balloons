import React from "react";
import PropTypes from "prop-types";
import cookies from "js-cookie";
import axios from "axios";
import { withAsyncSetState, getApiUrl, parseToken } from "@utils";
import { TOKEN } from "@consts/_common";

export const AuthContext = React.createContext();

class AuthProviderClass extends React.Component {
	state = {
		user: null,
		token: null
	};

	componentDidMount = () => {
		this.makeAuthIfNeeded();
	};

	makeAuthIfNeeded = () => {
		const { user } = this.state;
		const token = parseToken();

		if (!user && token) {
			return this.authStart(token)
				.then(this.performAuth)
				.then(this.authSuccess)
				.catch(this.authFail);
		}

		return Promise.resolve();
	};

	authStart = token =>
		this.asyncSetState({
			token
		});

	performAuth = () => {
		const { token } = this.state;

		return axios.get(getApiUrl("/user/auth"), {
			headers: {
				authorization: token
			}
		});
	};

	authSuccess = ({ data }) =>
		this.asyncSetState({
			user: data
		});

	authFail = () => {
		cookies.remove(TOKEN);
	};

	setUser = ({ token, user }) => {
		cookies.set(TOKEN, token);

		return this.asyncSetState({
			user,
			token
		});
	};

	logout = () => {
		cookies.remove(TOKEN);

		return this.asyncSetState({
			user: null,
			token: null
		});
	};

	render = () => (
		<AuthContext.Provider
			value={{
				user: this.state.user,
				token: this.state.token,
				setUser: this.setUser,
				logout: this.logout
			}}
		>
			{this.props.children}
		</AuthContext.Provider>
	);
}

AuthProviderClass.propTypes = {
	token: PropTypes.string,
	children: PropTypes.element.isRequired
};

AuthProviderClass.defaultProps = {
	token: null
};

const AuthProviderClassWithAsyncSetState = withAsyncSetState(AuthProviderClass);

export const AuthProvider = AuthProviderClassWithAsyncSetState;
