import React from "react";
import PropTypes from "prop-types";
import cookies from "js-cookie";
import axios from "axios";
import { withAsyncSetState, getApiUrl } from "@utils";
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
		const token = this.getToken();

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

	performAuth = () =>
		axios.get(getApiUrl("/user/auth"), {
			headers: {
				authorization: this.state.token
			}
		});

	authSuccess = ({ data }) =>
		this.asyncSetState({
			user: data
		});

	authFail = () => {
		cookies.remove(TOKEN);
	};

	getToken = () => {
		const { token } = this.props;

		return token ? token : cookies.get(TOKEN);
	};

	setUser = ({ token, user }) =>
		this.asyncSetState({
			user,
			token
		}).then(() => cookies.set(TOKEN, token));

	logout = () =>
		this.asyncSetState({
			user: null,
			token: null
		}).then(() => cookies.remove(TOKEN));

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
