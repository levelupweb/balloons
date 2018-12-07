import React from "react";
import PropTypes from "prop-types";
import { parseError, withAsyncSetState, fetch } from "@utils";
import { SALE_MODEL } from "@consts/sale";
import { FETCH_SALES_CREATE, FETCH_SALES_ENTRIES } from "@consts/_fetch";
import { FetcherContext, AuthContext, CollectionsContext } from "@providers";

export const SalesContext = React.createContext();

class SalesProviderClass extends React.Component {
	state = {
		salesIds: this.props.salesIds,
		creating: {
			isHydrating: false,
			temporarySale: {},
			error: null,
			isCreating: false,
			typeErrors: null
		},
		fetching: {
			isHydrating: false,
			error: this.props.fetchError
		}
	};

	/**
	 * Fetching
	 */

	handleFetchingState = data =>
		this.asyncSetState({
			fetching: {
				...this.state.fetching,
				...data
			}
		});

	fetchSalesStart = () =>
		this.handleFetchingState({
			isHydrating: true,
			error: null
		})
			.then(this.processFetching)
			.then(this.fetchSalesSuccess)
			.catch(this.fetchSalesFail);

	processFetching = () => {
		const { fetcher } = this.props;

		return fetch(fetcher, FETCH_SALES_ENTRIES);
	};

	fetchSalesSuccess = ({ data }) => {
		const { insertSales } = this.props;

		return insertSales(data).then(() =>
			this.asyncSetState({
				fetching: {
					...this.state.fetching,
					isHydrating: false
				},
				salesIds: data.map(sale => sale._id)
			})
		);
	};

	fetchSalesFail = reason =>
		this.handleFetchingState({
			isHydrating: false,
			error: parseError(reason)
		});

	/**
	 * Creating
	 */

	handleCreatingState = data =>
		this.asyncSetState({
			creating: {
				...this.state.creating,
				...data
			}
		});

	createSaleStart = () =>
		this.handleCreatingState({
			isHydrating: true,
			error: null,
			typeErrors: null
		})
			.then(this.processUpdate)
			.then(this.createSaleSuccess)
			.catch(this.createSaleFail);

	processUpdate = () => {
		const { fetcher } = this.props;
		const { temporarySale } = this.state.creating;

		return fetch(fetcher, FETCH_SALES_CREATE, temporarySale);
	};

	createSaleSuccess = ({ data }) => {
		const { insertSale } = this.props;
		const { salesIds } = this.state;

		return insertSale(data).then(() =>
			this.asyncSetState({
				salesIds: [...salesIds, data._id],
				creating: {
					isHydrating: false,
					temporarySale: {},
					error: null,
					typeErrors: null,
					isCreating: false
				}
			})
		);
	};

	createSaleFail = reason => {
		const error = parseError(reason);

		if (typeof error === "string") {
			return this.handleCreatingState({
				isHydrating: false,
				error
			});
		}

		return this.handleCreatingState({
			isHydrating: false,
			typeErrors: error
		});
	};

	handleTemporarySale = data =>
		this.handleCreatingState({
			temporarySale: {
				...this.state.creating.temporarySale,
				...data
			}
		});

	getTemporaryField = field => {
		const { temporarySale } = this.state.creating;

		if (temporarySale && temporarySale[field]) {
			return temporarySale[field];
		}

		return null;
	};

	handleIsCreating = isCreating =>
		this.handleCreatingState({
			isCreating
		});

	render = () => (
		<SalesContext.Provider
			value={{
				salesIds: this.state.salesIds,
				handleIsCreating: this.handleIsCreating,
				canEdit: this.props.canEdit,
				createSaleStart: this.createSaleStart,
				creating: this.state.creating,
				handleTemporarySale: this.handleTemporarySale,
				getTemporaryField: this.getTemporaryField,
				fetching: this.state.fetching,
				fetchSalesStart: this.fetchSalesStart
			}}
		>
			{this.props.children}
		</SalesContext.Provider>
	);
}

SalesProviderClass.propTypes = {
	children: PropTypes.element.isRequired,
	fetchError: PropTypes.string,
	fetcher: PropTypes.func.isRequired,
	salesIds: PropTypes.arrayOf(PropTypes.string),
	canEdit: PropTypes.bool.isRequired,
	insertSale: PropTypes.func.isRequired,
	insertSales: PropTypes.func.isRequired
};

SalesProviderClass.defaultProps = {
	salesIds: null,
	fetchError: null
};

const SalesProviderClassWithAsyncSetState = withAsyncSetState(
	SalesProviderClass
);

const SalesProviderClassWithFetcherContext = props => (
	<FetcherContext.Consumer>
		{ctx => (
			<SalesProviderClassWithAsyncSetState {...props} fetcher={ctx.fetcher} />
		)}
	</FetcherContext.Consumer>
);

const SalesProviderClassWithAuthContext = props => (
	<AuthContext.Consumer>
		{ctx => (
			<SalesProviderClassWithFetcherContext {...props} canEdit={!!ctx.user} />
		)}
	</AuthContext.Consumer>
);

const SalesProviderClassWithCollectionsContext = props => (
	<CollectionsContext.Consumer>
		{ctx => (
			<SalesProviderClassWithAuthContext
				{...props}
				insertSale={sale => ctx.insertDocuments(SALE_MODEL, [sale])}
				insertSales={sales => ctx.insertDocuments(SALE_MODEL, sales)}
			/>
		)}
	</CollectionsContext.Consumer>
);

export const SalesProvider = SalesProviderClassWithCollectionsContext;
