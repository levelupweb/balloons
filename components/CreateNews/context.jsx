import React from "react";
import PropTypes from "prop-types";
import { fetch, parseError, withAsyncSetState } from "@utils";
import { FETCH_NEWS_CREATE } from "@consts/_fetch";
import { FetcherContext, AuthContext } from "@providers";
import * as newsConsts from "@consts/news";

export const CreateNewsContext = React.createContext();

class CreateNewsProviderClass extends React.Component {
	state = {
		createdNewsId: null,
		creating: {
			isHydrating: false,
			error: null,
			typeErrors: null
		},
		data: {
			[newsConsts.NEWS_TITLE]: "",
			[newsConsts.NEWS_CONTENT]: "",
			[newsConsts.NEWS_IMAGE]: null,
			[newsConsts.NEWS_DESCRIPTION]: ""
		}
	};

	handleData = data =>
		this.asyncSetState({
			data: {
				...this.state.data,
				...data
			}
		});

	handleCreatingState = data =>
		this.asyncSetState({
			creating: {
				...this.state.creating,
				...data
			}
		});

	createNewsStart = () =>
		this.handleCreatingState({
			isHydrating: true,
			error: null,
			typeErrors: null
		})
			.then(this.createNewsProcess)
			.then(this.createNewsSuccess)
			.catch(this.createNewsFail);

	createNewsProcess = () => {
		const { fetcher } = this.props;
		const { data } = this.state;

		return fetch(fetcher, FETCH_NEWS_CREATE, data);
	};

	createNewsSuccess = ({ data }) =>
		this.asyncSetState({
			createdNewsId: data._id,
			creating: {
				...this.state.creating,
				isHydrating: false,
				error: null,
				typeErrors: null
			},
			data: {
				[newsConsts.NEWS_TITLE]: "",
				[newsConsts.NEWS_CONTENT]: "",
				[newsConsts.NEWS_IMAGE]: null,
				[newsConsts.NEWS_DESCRIPTION]: ""
			}
		});

	createNewsFail = reason => {
		const error = parseError(reason);

		if (typeof error === "string") {
			return this.handleCreatingState({
				error,
				isHydrating: false
			});
		}

		return this.handleCreatingState({
			typeErrors: error,
			isHydrating: false
		});
	};

	render = () => (
		<CreateNewsContext.Provider
			value={{
				handleData: this.handleData,
				createNewsStart: this.createNewsStart,
				mayPost: this.props.mayPost,
				...this.state
			}}
		>
			{this.props.children}
		</CreateNewsContext.Provider>
	);
}

CreateNewsProviderClass.propTypes = {
	mayPost: PropTypes.bool.isRequired,
	children: PropTypes.any.isRequired,
	fetcher: PropTypes.func.isRequired
};

const CreateNewsProviderClassWithAsyncSetState = withAsyncSetState(
	CreateNewsProviderClass
);

const CreateNewsProviderClassWithFetcherContext = props => (
	<FetcherContext.Consumer>
		{ctx => (
			<CreateNewsProviderClassWithAsyncSetState
				{...props}
				fetcher={ctx.fetcher}
			/>
		)}
	</FetcherContext.Consumer>
);

const CreateNewsProviderClassWithAuthContext = props => (
	<AuthContext.Consumer>
		{ctx => (
			<CreateNewsProviderClassWithFetcherContext
				{...props}
				mayPost={!!ctx.user}
			/>
		)}
	</AuthContext.Consumer>
);

export const CreateNewsProvider = CreateNewsProviderClassWithAuthContext;
