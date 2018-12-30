import React from "react";
import PropTypes from "prop-types";
import { fetch, parseError, withAsyncSetState } from "@utils";
import { NEWS_MODEL } from "@consts/_models";
import { CollectionsContext, FetcherContext } from "@providers";
import { FETCH_UPDATE_NEWS } from "@consts/_fetch";

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

export const NewsSingleContext = React.createContext(defaultState);

class NewsSingleProviderClass extends React.Component {
	state = {
		...defaultState,
		temporaryData: {},
		item: this.props.item,
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

	updateNewsStart = () =>
		this.handleUpdatingState({
			isHydrating: true,
			error: null,
			isSuccess: false,
			typeErrors: null
		})
			.then(this.processUpdate)
			.then(this.updateNewsSuccess)
			.catch(this.updateNewsFail);

	processUpdate = () => {
		const { temporaryData } = this.state;
		const { fetcher, item } = this.props;

		return fetch(fetcher, FETCH_UPDATE_NEWS, temporaryData, {
			params: {
				newsId: item._id
			}
		});
	};

	updateNewsSuccess = ({ data }) => {
		const { updateNews } = this.props;

		return updateNews(data).then(() =>
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

	updateNewsFail = reason => {
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
		<NewsSingleContext.Provider
			value={{
				...this.state,
				handleIsEditing: this.handleIsEditing,
				updateNewsStart: this.updateNewsStart,
				getTypeError: this.getTypeError,
				handleTemporaryData: this.handleTemporaryData,
				getField: this.getField,
				otherIds: this.props.otherIds,
				item: this.props.item
			}}
		>
			{this.props.children}
		</NewsSingleContext.Provider>
	);
}

NewsSingleProviderClass.propTypes = {
	children: PropTypes.element.isRequired,
	updateNews: PropTypes.func.isRequired,
	fetchError: PropTypes.string,
	fetcher: PropTypes.func.isRequired,
	removeNews: PropTypes.func.isRequired,
	otherIds: PropTypes.array,
	defaultEditing: PropTypes.bool,
	item: PropTypes.object
};

NewsSingleProviderClass.defaultProps = {
	fetchError: null,
	defaultEditing: false,
	otherIds: null,
	item: null
};

const NewsSingleProviderClassWithAsyncSetState = withAsyncSetState(
	NewsSingleProviderClass
);

const NewsSingleProviderClassWithCollectionsContext = ({ newsId, ...rest }) => (
	<CollectionsContext.Consumer>
		{ctx => (
			<NewsSingleProviderClassWithAsyncSetState
				{...rest}
				updateNews={news => ctx.updateDocument(NEWS_MODEL, newsId, news)}
				removeNews={() => ctx.removeDocuments(NEWS_MODEL, [newsId])}
				item={ctx.getEntity(NEWS_MODEL, newsId)}
			/>
		)}
	</CollectionsContext.Consumer>
);

NewsSingleProviderClassWithCollectionsContext.propTypes = {
	newsId: PropTypes.string.isRequired
};

const NewsSingleProviderClassWithFetcherContext = props => (
	<FetcherContext.Consumer>
		{ctx => (
			<NewsSingleProviderClassWithCollectionsContext
				{...props}
				fetcher={ctx.fetcher}
			/>
		)}
	</FetcherContext.Consumer>
);

export const NewsSingleProvider = NewsSingleProviderClassWithFetcherContext;
