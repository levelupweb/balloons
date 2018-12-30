import React from "react";
import PropTypes from "prop-types";
import { fetch, parseError, withAsyncSetState } from "@utils";
import { FETCH_PORTFOLIO_CREATE } from "@consts/_fetch";
import { FetcherContext } from "@providers";
import * as portfolioConsts from "@consts/portfolio";

export const CreatePortfolioContext = React.createContext();

class CreatePortfolioProviderClass extends React.Component {
	state = {
		createdPortfolioId: null,
		creating: {
			isHydrating: false,
			error: null,
			typeErrors: null
		},
		data: {
			[portfolioConsts.PORTFOLIO_TITLE]: "",
			[portfolioConsts.PORTFOLIO_IMAGES]: [],
			[portfolioConsts.PORTFOLIO_DESCRIPTION]: ""
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

	createPortfolioStart = () =>
		this.handleCreatingState({
			isHydrating: true,
			error: null,
			typeErrors: null
		})
			.then(this.createPortfolioProcess)
			.then(this.createPortfolioSuccess)
			.catch(this.createPortfolioFail);

	createPortfolioProcess = () => {
		const { fetcher } = this.props;
		const { data } = this.state;

		return fetch(fetcher, FETCH_PORTFOLIO_CREATE, data);
	};

	createPortfolioSuccess = ({ data }) =>
		this.asyncSetState({
			createdPortfolioId: data._id,
			creating: {
				...this.state.creating,
				isHydrating: false,
				error: null,
				typeErrors: null
			},
			data: {
				[portfolioConsts.PORTFOLIO_TITLE]: "",
				[portfolioConsts.PORTFOLIO_IMAGES]: [],
				[portfolioConsts.PORTFOLIO_DESCRIPTION]: ""
			}
		});

	createPortfolioFail = reason => {
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
		<CreatePortfolioContext.Provider
			value={{
				handleData: this.handleData,
				createPortfolioStart: this.createPortfolioStart,
				...this.state
			}}
		>
			{this.props.children}
		</CreatePortfolioContext.Provider>
	);
}

CreatePortfolioProviderClass.propTypes = {
	children: PropTypes.any.isRequired,
	fetcher: PropTypes.func.isRequired
};

const CreatePortfolioProviderClassWithAsyncSetState = withAsyncSetState(
	CreatePortfolioProviderClass
);

const CreatePortfolioProviderClassWithFetcherContext = props => (
	<FetcherContext.Consumer>
		{ctx => (
			<CreatePortfolioProviderClassWithAsyncSetState
				{...props}
				fetcher={ctx.fetcher}
			/>
		)}
	</FetcherContext.Consumer>
);

export const CreatePortfolioProvider = CreatePortfolioProviderClassWithFetcherContext;
