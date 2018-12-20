import React from "react";
import PropTypes from "prop-types";
import { fetch, parseError, withAsyncSetState } from "@utils";
import { PORTFOLIO_IMAGES } from "@consts/portfolio";
import { PORTFOLIO_MODEL } from "@consts/_models";
import { CollectionsContext, FetcherContext } from "@providers";
import { FETCH_PORTFOLIO_UPDATE } from "@consts/_fetch";

const defaultState = {
	updating: {
		isHydrating: false,
		error: null,
		typeErrors: null,
		isSuccess: false
	},
	removing: {
		isHydrating: false,
		error: null
	}
};

export const PortfolioSingleContext = React.createContext(defaultState);

class PortfolioSingleProviderClass extends React.Component {
	state = {
		...defaultState,
		temporaryData: {},
		isEditing: this.props.defaultEditing,
		fetchError: this.props.fetchError
	};

	handleUpdatingState = data =>
		this.asyncSetState({
			updating: {
				...this.state.updating,
				...data
			}
		});

	updatePortfolioStart = () =>
		this.handleUpdatingState({
			isHydrating: true,
			error: null,
			isSuccess: false,
			typeErrors: null
		})
			.then(this.processUpdate)
			.then(this.updatePortfolioSuccess)
			.catch(this.updatePortfolioFail);

	processUpdate = () => {
		const { temporaryData } = this.state;
		const { fetcher, item } = this.props;

		return fetch(fetcher, FETCH_PORTFOLIO_UPDATE, temporaryData, {
			params: {
				portfolioId: item._id
			}
		});
	};

	updatePortfolioSuccess = ({ data }) => {
		const { updatePortfolio } = this.props;

		return updatePortfolio(data).then(() =>
			this.asyncSetState({
				updating: {
					...this.state.updating,
					isHydrating: false,
					isSuccess: true
				},
				isEditing: false,
				temporaryData: {}
			})
		);
	};

	updatePortfolioFail = reason => {
		const error = parseError(reason);

		if (typeof error === "string") {
			return this.handleUpdatingState({
				isHydrating: false,
				error
			});
		}

		return this.handleUpdatingState({
			isHydrating: false,
			typeErrors: error
		});
	};

	handleIsEditing = isEditing =>
		this.asyncSetState({
			isEditing
		});

	handleTemporaryData = data =>
		this.asyncSetState({
			temporaryData: {
				...this.state.temporaryData,
				...data
			}
		});

	getTypeError = field => {
		const { updating } = this.state;

		return updating.typeErrors && updating.typeErrors[field];
	};

	addImage = newImage => {
		const { temporaryData } = this.state;
		const { item } = this.props;

		if (!temporaryData[PORTFOLIO_IMAGES]) {
			return this.handleTemporaryData({
				[PORTFOLIO_IMAGES]: [newImage, ...item[PORTFOLIO_IMAGES]]
			});
		}

		return this.handleTemporaryData({
			[PORTFOLIO_IMAGES]: [newImage, ...temporaryData[PORTFOLIO_IMAGES]]
		});
	};

	removeImage = index => {
		const { temporaryData } = this.state;
		const { item } = this.props;

		if (!temporaryData[PORTFOLIO_IMAGES]) {
			return this.handleTemporaryData({
				[PORTFOLIO_IMAGES]: item[PORTFOLIO_IMAGES].filter((_, i) => i !== index)
			});
		}

		return this.handleTemporaryData({
			[PORTFOLIO_IMAGES]: temporaryData[PORTFOLIO_IMAGES].filter(
				(_, i) => i !== index
			)
		});
	};

	getField = field => {
		const { isEditing, temporaryData } = this.state;
		const { item } = this.props;

		if (!isEditing) {
			return item[field];
		}

		if (temporaryData[field] !== undefined) {
			return temporaryData[field];
		}

		return item[field];
	};

	render = () => (
		<PortfolioSingleContext.Provider
			value={{
				...this.state,
				handleIsEditing: this.handleIsEditing,
				updatePortfolioStart: this.updatePortfolioStart,
				getTypeError: this.getTypeError,
				handleTemporaryData: this.handleTemporaryData,
				getField: this.getField,
				addImage: this.addImage,
				removeImage: this.removeImage,
				item: this.props.item
			}}
		>
			{this.props.children}
		</PortfolioSingleContext.Provider>
	);
}

PortfolioSingleProviderClass.propTypes = {
	children: PropTypes.element.isRequired,
	updatePortfolio: PropTypes.func.isRequired,
	fetchError: PropTypes.string,
	fetcher: PropTypes.func.isRequired,
	removePortfolio: PropTypes.func.isRequired,
	defaultEditing: PropTypes.bool,
	item: PropTypes.object
};

PortfolioSingleProviderClass.defaultProps = {
	fetchError: null,
	defaultEditing: false,
	item: null
};

const PortfolioSingleProviderClassWithAsyncSetState = withAsyncSetState(
	PortfolioSingleProviderClass
);

const PortfolioSingleProviderClassWithCollectionsContext = ({
	portfolioId,
	...rest
}) => (
	<CollectionsContext.Consumer>
		{ctx => (
			<PortfolioSingleProviderClassWithAsyncSetState
				{...rest}
				updatePortfolio={portfolio =>
					ctx.updateDocument(PORTFOLIO_MODEL, portfolioId, portfolio)
				}
				removePortfolio={() =>
					ctx.removeDocuments(PORTFOLIO_MODEL, [portfolioId])
				}
				item={ctx.getEntity(PORTFOLIO_MODEL, portfolioId)}
			/>
		)}
	</CollectionsContext.Consumer>
);

PortfolioSingleProviderClassWithCollectionsContext.propTypes = {
	portfolioId: PropTypes.string.isRequired
};

const PortfolioSingleProviderClassWithFetcherContext = props => (
	<FetcherContext.Consumer>
		{ctx => (
			<PortfolioSingleProviderClassWithCollectionsContext
				{...props}
				fetcher={ctx.fetcher}
			/>
		)}
	</FetcherContext.Consumer>
);

export const PortfolioSingleProvider = PortfolioSingleProviderClassWithFetcherContext;
