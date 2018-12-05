import React from "react";
import PropTypes from "prop-types";
import { fetch, parseError, withAsyncSetState } from "@utils";
import { ARTICLE_MODEL } from "@consts/_models";
import { CollectionsContext, FetcherContext } from "@providers";
import { FETCH_UPDATE_ARTICLE } from "@consts/_fetch";

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

		return fetch(fetcher, FETCH_UPDATE_ARTICLE, temporaryArticle, {
			params: {
				articleId: temporaryArticle._id
			}
		});
	};

	updateArticleSuccess = ({ data }) => {
		const { updateArticle } = this.props;

		return updateArticle(data).then(() =>
			this.handleUpdatingState({
				isHydrating: false
			})
		);
	};

	updateArticleFail = reason => {
		const error = parseError(reason);

		if (typeof error === "string") {
			return this.asyncSetState({
				isHydrating: false,
				error
			});
		}

		return this.asyncSetState({
			isHydrating: false,
			typeError: error
		});
	};

	render = () => (
		<ArticleSingleContext.Provider value={this.state}>
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
	article: PropTypes.object,
	otherArticlesIds: PropTypes.arrayOf(PropTypes.object)
};

ArticleSingleProviderClass.defaultProps = {
	error: null,
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
					ctx.updateArticle(ARTICLE_MODEL, article._id, article)
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
