import React from "react";
import PropTypes from "prop-types";
import { FetcherContext, CollectionsContext } from "@providers";
import { withAsyncSetState, fetch, parseError } from "@utils";
import { MODEL_PORTFOLIO } from "@consts/_models";
import { FETCH_PORTFOLIO_ENTRIES } from "@consts/_fetch";

export const PortfolioContext = React.createContext();

class PortfolioProviderClass extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			displayPortfolio: props.defaultPortfolio,
			fetching: {
				isHydrating: false,
				error: props.fetchError
			}
		};
	}

	handleFetchingState = data =>
		this.asyncSetState({
			fetching: {
				...this.state.fetching,
				...data
			}
		});

	fetchPortfolioStart = () =>
		this.handleFetchingState({
			isHydrating: true,
			error: null
		})
			.then(this.fetchPortfolioProcess)
			.then(this.fetchPortfolioSuccess)
			.catch(this.fetchPortfolioFail);

	fetchPortfolioProcess = () => {
		const { fetcher } = this.props;

		return fetch(fetcher, FETCH_PORTFOLIO_ENTRIES);
	};

	fetchPortfolioSuccess = ({ data }) => {
		const { insertPortfolio } = this.props;

		return insertPortfolio(data).then(() =>
			this.asyncSetState({
				displayPortfolio: data.map(item => item._id),
				fetching: {
					error: null,
					isHydrating: false
				}
			})
		);
	};

	fetchPortfolioFail = reason =>
		this.handleFetchingState({
			isHydrating: false,
			error: parseError(reason)
		});

	render = () => (
		<PortfolioContext.Provider
			value={{
				fetchPortfolioStart: this.fetchPortfolioStart,
				...this.state
			}}
		>
			{this.props.children}
		</PortfolioContext.Provider>
	);
}

PortfolioProviderClass.propTypes = {
	children: PropTypes.any.isRequired,
	defaultPortfolio: PropTypes.array,
	fetchError: PropTypes.object,
	fetcher: PropTypes.func.isRequired,
	insertPortfolio: PropTypes.func.isRequired
};

PortfolioProviderClass.defaultProps = {
	fetchError: null
};

const PortfolioProviderWithAsyncSetState = withAsyncSetState(
	PortfolioProviderClass
);

const PortfolioProviderWithFetcherContext = props => (
	<FetcherContext.Consumer>
		{ctx => (
			<PortfolioProviderWithAsyncSetState {...props} fetcher={ctx.fetcher} />
		)}
	</FetcherContext.Consumer>
);

const PortfolioProviderWithCollectionsContext = props => (
	<CollectionsContext.Consumer>
		{ctx => (
			<PortfolioProviderWithFetcherContext
				{...props}
				insertPortfolio={portfolio =>
					ctx.insertDocuments(MODEL_PORTFOLIO, portfolio)
				}
			/>
		)}
	</CollectionsContext.Consumer>
);

export const PortfolioProvider = PortfolioProviderWithCollectionsContext;
