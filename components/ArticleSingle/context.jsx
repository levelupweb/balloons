import React from "react";
import PropTypes from "prop-types";
import { fetch, parseError, withAsyncSetState } from "@utils";
import { ARTICLE_MODEL } from "@consts/_models";
import { CollectionsContext, FetcherContext } from "@providers";
import { FETCH_UPDATE_ARTICLE } from "@consts/_fetch";
import { prepareArticle } from "./utils";

const defaultState = {
	updating: {
		isHydrating: false,
		error: null,
		typeErrors: null
	},
	removing: {
		isHydrating: false,
		error: null
	}
};

export const ArticleSingleContext = React.createContext(defaultState);

class ArticleSingleProviderClass extends React.Component {
	state = {
		...defaultState,
		otherArticlesIds: this.props.otherArticlesIds,
		temporaryArticle: this.props.article,
		defaultArticle: this.props.article,
		isEditing: this.props.isEditing,
		fetchError: this.props.error
	};

	handleUpdatingState = data =>
		this.asyncSetState({
			updating: {
				...this.state.updating,
				...data
			}
		});

	updateArticleStart = () =>
		this.handleUpdatingState({
			isHydrating: true,
			error: null,
			typeErrors: null
		})
			.then(this.processUpdate)
			.then(this.updateArticleSuccess)
			.catch(this.updateArticleFail);

	processUpdate = () => {
		const { temporaryArticle } = this.state;
		const { fetcher } = this.props;

		return fetch(
			fetcher,
			FETCH_UPDATE_ARTICLE,
			prepareArticle(temporaryArticle),
			{
				params: {
					articleId: temporaryArticle._id
				}
			}
		);
	};

	updateArticleSuccess = ({ data }) => {
		const { updateArticle } = this.props;

		return updateArticle(data).then(() =>
			this.asyncSetState({
				updating: {
					...this.state.updating,
					isHydrating: false
				},
				defaultArticle: data
			})
		);
	};

	updateArticleFail = reason => {
		const error = parseError(reason);

		if (typeof error === "string") {
			return this.handleUpdatingState({
				isHydrating: false,
				error
			});
		}

		return this.handleUpdatingState({
			isHydrating: false,
			typeError: error
		});
	};

	handleIsEditing = isEditing => {
		const { defaultArticle, temporaryArticle } = this.state;

		this.asyncSetState({
			isEditing,
			temporaryArticle: isEditing === false ? defaultArticle : temporaryArticle
		});
	};

	handleTemporaryArticle = data =>
		this.asyncSetState({
			temporaryArticle: {
				...this.state.temporaryArticle,
				...data
			}
		});

	getTypeErrorMessage = field => {
		const { updating } = this.state;

		return (
			updating.typeErrors &&
			updating.typeErrors[field] &&
			updating.typeErrors[field].msg
		);
	};

	render = () => (
		<ArticleSingleContext.Provider
			value={{
				...this.state,
				handleIsEditing: this.handleIsEditing,
				updateArticleStart: this.updateArticleStart,
				getTypeErrorMessage: this.getTypeErrorMessage,
				handleTemporaryArticle: this.handleTemporaryArticle
			}}
		>
			{this.props.children}
		</ArticleSingleContext.Provider>
	);
}

ArticleSingleProviderClass.propTypes = {
	children: PropTypes.element.isRequired,
	updateArticle: PropTypes.func.isRequired,
	error: PropTypes.string,
	fetcher: PropTypes.func.isRequired,
	removeArticle: PropTypes.func.isRequired,
	isEditing: PropTypes.bool,
	article: PropTypes.object,
	otherArticlesIds: PropTypes.arrayOf(PropTypes.object)
};

ArticleSingleProviderClass.defaultProps = {
	error: null,
	isEditing: false,
	otherArticlesIds: null,
	article: null
};

const ArticleSingleProviderClassWithAsyncSetState = withAsyncSetState(
	ArticleSingleProviderClass
);

const ArticleSingleProviderClassWithCollectionsContext = props => (
	<CollectionsContext.Consumer>
		{ctx => (
			<ArticleSingleProviderClassWithAsyncSetState
				{...props}
				updateArticle={article =>
					ctx.updateDocument(ARTICLE_MODEL, article._id, article)
				}
				removeArticle={articleId =>
					ctx.removeDocuments(ARTICLE_MODEL, [articleId])
				}
			/>
		)}
	</CollectionsContext.Consumer>
);

const ArticleSingleProviderClassWithFetcherContext = props => (
	<FetcherContext.Consumer>
		{ctx => (
			<ArticleSingleProviderClassWithCollectionsContext
				{...props}
				fetcher={ctx.fetcher}
			/>
		)}
	</FetcherContext.Consumer>
);

export const ArticleSingleProvider = ArticleSingleProviderClassWithFetcherContext;
