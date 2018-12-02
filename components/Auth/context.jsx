import React from "react";
import PropTypes from "prop-types";
import { withAsyncSetState, parseError, fetch } from "@utils";
import { AuthContext, FetcherContext } from "@providers";
import { FETCH_SIGNIN } from "@consts/_fetch";
import { USER_LOGIN, USER_PASSWORD } from "../../consts/user";

export const AuthComponentContext = React.createContext();

class AuthComponentProviderClass extends React.Component {
	state = {
		credentials: {
			[USER_LOGIN]: "",
			[USER_PASSWORD]: ""
		},
		isHydrating: false,
		typeErrors: null,
		error: null
	};

	authStart = () =>
		this.asyncSetState({
			isHydrating: true,
			typeErrors: null,
			error: null
		})
			.then(this.performAuth)
			.then(this.authSuccess)
			.catch(this.authFail);

	performAuth = () => {
		const { fetcher } = this.props;
		const { credentials } = this.state;

		return fetch(fetcher, FETCH_SIGNIN, credentials);
	};

	authSuccess = ({ data }) => {
		const { setUser } = this.props;

		return setUser(data).then(() =>
			this.asyncSetState({
				isHydrating: false
			})
		);
	};

	authFail = reason => {
		const error = parseError(reason);

		if (typeof error === "string") {
			return this.asyncSetState({
				error,
				isHydrating: false
			});
		}

		return this.asyncSetState({
			typeErrors: error,
			isHydrating: false
		});
	};

	getTypeErrorMessage = field => {
		const { typeErrors } = this.state;

		if (typeErrors && typeErrors[field]) {
			return typeErrors[field].msg;
		}

		return null;
	};

	handleCredentials = data =>
		this.asyncSetState({
			credentials: {
				...this.state.credentials,
				...data
			}
		});

	render = () => (
		<AuthComponentContext.Provider
			value={{
				isHydrating: this.state.isHydrating,
				error: this.state.error,
				credentials: this.state.credentials,
				handleCredentials: this.handleCredentials,
				getTypeErrorMessage: this.getTypeErrorMessage,
				authStart: this.authStart,
				shouldRedirect: !!this.props.user
			}}
		>
			{this.props.children}
		</AuthComponentContext.Provider>
	);
}

AuthComponentProviderClass.propTypes = {
	children: PropTypes.element.isRequired,
	fetcher: PropTypes.func.isRequired,
	user: PropTypes.object,
	setUser: PropTypes.func.isRequired
};

AuthComponentProviderClass.defaultProps = {
	user: null
};

const AuthWithAsyncSetState = withAsyncSetState(AuthComponentProviderClass);

const AuthComponentProviderWithFetcherContext = props => (
	<FetcherContext.Consumer>
		{ctx => <AuthWithAsyncSetState {...props} fetcher={ctx.fetcher} />}
	</FetcherContext.Consumer>
);

const AuthComponentProviderWithAuthContext = props => (
	<AuthContext.Consumer>
		{ctx => (
			<AuthComponentProviderWithFetcherContext
				{...props}
				user={ctx.user}
				setUser={ctx.setUser}
			/>
		)}
	</AuthContext.Consumer>
);

export const AuthComponentProvider = AuthComponentProviderWithAuthContext;
