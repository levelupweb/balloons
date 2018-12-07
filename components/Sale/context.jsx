import React from "react";
import PropTypes from "prop-types";
import { SALE_MODEL } from "@consts/_models";
import { parseError, withAsyncSetState, fetch } from "@utils";
import { FETCH_SALES_UPDATE, FETCH_SALES_REMOVE } from "@consts/_fetch";
import { CollectionsContext, AuthContext, FetcherContext } from "@providers";

export const SaleContext = React.createContext();

class SaleProviderClass extends React.Component {
	state = {
		notification: null,
		updating: {
			temporarySale: {},
			isEditing: false,
			isHydrating: false,
			error: null,
			typeErrors: null
		},
		removing: {
			isHydrating: false,
			isRemoving: false,
			error: null
		}
	};

	handleUpdatingState = data =>
		this.asyncSetState({
			updating: {
				...this.state.updating,
				...data
			}
		});

	handleTemporarySale = data =>
		this.handleUpdatingState({
			temporarySale: {
				...this.state.updating.temporarySale,
				...data
			}
		});

	handleNotification = notification =>
		this.asyncSetState({
			notification
		});

	/**
	 * Updating
	 */

	updateSaleStart = () =>
		this.handleUpdatingState({
			isHydrating: true,
			error: null,
			typeErrors: null
		})
			.then(this.processUpdate)
			.then(this.updateSaleSuccess)
			.catch(this.updateSaleFail);

	processUpdate = () => {
		const { fetcher, saleId } = this.props;
		const { temporarySale } = this.state.updating;

		return fetch(fetcher, FETCH_SALES_UPDATE, temporarySale, {
			params: {
				saleId
			}
		});
	};

	updateSaleSuccess = ({ data }) => {
		const { updateSale } = this.props;

		return updateSale(data)
			.then(() =>
				this.handleUpdatingState({
					isHydrating: false,
					isEditing: false
				})
			)
			.then(() =>
				this.handleNotification({
					color: "green",
					content: "Акция была успешно обновлена"
				})
			);
	};

	updateSaleFail = reason => {
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

	/**
	 * Removing
	 */

	handleRemovingState = data =>
		this.asyncSetState({
			removing: {
				...this.state.removing,
				...data
			}
		});

	removeSaleStart = () =>
		this.handleRemovingState({
			isHydrating: true,
			error: null
		})
			.then(this.processRemove)
			.then(this.removeSaleSuccess)
			.catch(this.removeSaleFail);

	processRemove = () => {
		const { fetcher, saleId } = this.props;

		return fetch(fetcher, FETCH_SALES_REMOVE, {
			params: {
				saleId
			}
		});
	};

	removeSaleSuccess = () => {
		const { removeSale } = this.props;

		return removeSale()
			.then(() =>
				this.handleRemovingState({
					isHydrating: false
				})
			)
			.then(() =>
				this.handleNotification({
					color: "green",
					content: "Акция была успешно удалена"
				})
			);
	};

	removeSaleFail = reason =>
		this.handleRemovingState({
			isHydrating: false,
			error: parseError(reason)
		});

	dismissNotification = () =>
		this.asyncSetState({
			notification: null
		});

	handleIsRemoving = isRemoving =>
		this.handleRemovingState({
			isRemoving
		});

	handleIsEditing = isEditing =>
		this.handleUpdatingState({
			isEditing
		});

	getTemporaryField = field => {
		const { temporarySale } = this.state.updating;
		const { sale } = this.props;

		if (temporarySale[field] !== undefined && temporarySale[field] !== null) {
			return temporarySale[field];
		}

		if (sale && sale[field]) {
			return sale[field];
		}

		return null;
	};

	render = () => (
		<SaleContext.Provider
			value={{
				updating: this.state.updating,
				updateSaleStart: this.updateSaleStart,
				removing: this.state.removing,
				editable: this.props.isAuthed,
				handleIsEditing: this.handleIsEditing,
				notification: this.state.notification,
				getTemporaryField: this.getTemporaryField,
				dismissNotification: this.dismissNotification,
				removeSaleStart: this.removeSaleStart,
				sale: this.props.sale,
				handleIsRemoving: this.handleIsRemoving,
				handleTemporarySale: this.handleTemporarySale
			}}
		>
			{this.props.children}
		</SaleContext.Provider>
	);
}

SaleProviderClass.propTypes = {
	children: PropTypes.element.isRequired,
	updateSale: PropTypes.func.isRequired,
	fetcher: PropTypes.func.isRequired,
	sale: PropTypes.object.isRequired,
	saleId: PropTypes.string.isRequired,
	removeSale: PropTypes.func.isRequired,
	isAuthed: PropTypes.bool.isRequired
};

const SaleProviderWithAsyncSetState = withAsyncSetState(SaleProviderClass);

const SaleProviderWithCollectionsContext = props => (
	<CollectionsContext.Consumer>
		{ctx => (
			<SaleProviderWithAsyncSetState
				{...props}
				updateSale={data => ctx.updateDocument(SALE_MODEL, props.saleId, data)}
				removeSale={() => ctx.removeDocuments(SALE_MODEL, props.saleId)}
				sale={ctx.getEntity(SALE_MODEL, props.saleId)}
			/>
		)}
	</CollectionsContext.Consumer>
);

SaleProviderWithCollectionsContext.propTypres = {
	saleId: PropTypes.string.isRequired
};

const SaleProviderWithFetcherContext = props => (
	<FetcherContext.Consumer>
		{ctx => (
			<SaleProviderWithCollectionsContext {...props} fetcher={ctx.fetcher} />
		)}
	</FetcherContext.Consumer>
);

const SaleProviderWithAuthContext = props => (
	<AuthContext.Consumer>
		{ctx => <SaleProviderWithFetcherContext {...props} isAuthed={!!ctx.user} />}
	</AuthContext.Consumer>
);

export const SaleProvider = SaleProviderWithAuthContext;
