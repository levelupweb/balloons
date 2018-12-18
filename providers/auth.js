import React from "react";
import PropTypes from "prop-types";
import cookies from "js-cookie";
import { withAsyncSetState } from "@utils";
import { TOKEN } from "@consts/_common";

export const AuthContext = React.createContext();

class AuthProviderClass extends React.Component {
	state = {
		user: this.props.user,
		token: this.props.token
	};

	componentDidMount = () => {
		const { shouldRemoveToken } = this.props;

		if (shouldRemoveToken) {
			cookies.remove(TOKEN);
		}
	};

	setUser = ({ token, user }) => {
		cookies.set(TOKEN, token, { expires: 31 });

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
	children: PropTypes.element.isRequired,
	user: PropTypes.object,
	shouldRemoveToken: PropTypes.bool.isRequired
};

AuthProviderClass.defaultProps = {
	token: null,
	user: null
};

const AuthProviderClassWithAsyncSetState = withAsyncSetState(AuthProviderClass);

export const AuthProvider = AuthProviderClassWithAsyncSetState;
