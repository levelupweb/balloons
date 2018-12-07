import React from "react";
import PropTypes from "prop-types";
import { FetcherContext } from "@providers";
import { withAsyncSetState, fetch, parseError } from "@utils";
import { FETCH_SEND_CALLBACK } from "@consts/_fetch";
import { getDefaultMessage } from "./utils";

export const CallMeBackContext = React.createContext();

class CallMeBackProviderClass extends React.Component {
	state = {
		message: getDefaultMessage(),
		posting: {
			isHydrating: false,
			isSuccess: false,
			typeErrors: null,
			error: null
		}
	};

	handlePostingState = data =>
		this.asyncSetState({
			posting: {
				...this.state.posting,
				...data
			}
		});

	postMessageStart = () =>
		this.handlePostingState({
			isHydrating: true,
			typeErrors: null,
			isSuccess: false,
			error: null
		})
			.then(this.postProcess)
			.then(this.postMessageSuccess)
			.catch(this.postMessageFail);

	postProcess = () => {
		const { fetcher } = this.props;
		const { message } = this.state;

		return fetch(fetcher, FETCH_SEND_CALLBACK, message);
	};

	postMessageSuccess = () =>
		this.asyncSetState({
			posting: {
				...this.state.posting,
				isHydrating: false,
				isSuccess: true
			},
			message: getDefaultMessage()
		});

	postMessageFail = reason => {
		const error = parseError(reason);

		if (typeof error === "string") {
			return this.handlePostingState({
				isHydrating: false,
				error
			});
		}

		return this.handlePostingState({
			isHydrating: false,
			typeErrors: error
		});
	};

	handleMessage = data =>
		this.asyncSetState({
			message: {
				...this.state.message,
				...data
			}
		});

	getTypeErrorMessage = field => {
		const { typeErrors } = this.state.posting;

		return typeErrors && typeErrors[field] && typeErrors[field].msg;
	};

	render = () => (
		<CallMeBackContext.Provider
			value={{
				getTypeErrorMessage: this.getTypeErrorMessage,
				posting: this.state.posting,
				handleMessage: this.handleMessage,
				postMessageStart: this.postMessageStart,
				message: this.state.message
			}}
		>
			{this.props.children}
		</CallMeBackContext.Provider>
	);
}

CallMeBackProviderClass.propTypes = {
	fetcher: PropTypes.func.isRequired,
	children: PropTypes.element.isRequire
};

const CallMeBackWithAsyncSetState = withAsyncSetState(CallMeBackProviderClass);

const CallMeBackProviderClassWithFetcherContext = props => (
	<FetcherContext.Consumer>
		{ctx => <CallMeBackWithAsyncSetState {...props} fetcher={ctx.fetcher} />}
	</FetcherContext.Consumer>
);

export const CallMeBackProvider = CallMeBackProviderClassWithFetcherContext;
