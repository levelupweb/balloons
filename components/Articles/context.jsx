import React from "react";
import PropTypes from "prop-types";
import { ARTICLE_MODEL } from "@consts/_models";
import { withAsyncSetState, fetch, parseError } from "@utils";
import { FETCH_ARTICLES } from "@consts/_fetch";
import { CollectionsContext, FetcherContext } from "@providers";

const defaultState = {
	articles: null,
	isHydrating: false,
	error: null
};

export const ArticlesContext = React.createContext(defaultState);

class ArticlesProviderClass extends React.Component {
	state = defaultState;

	fetchArticlesStart = () => {
		const { fetcher } = this.props;

		return this.asyncSetState({
			isHydrating: true,
			articles: null,
			error: null
		})
			.then(() => fetch(fetcher, FETCH_ARTICLES))
			.then(this.fetchArticlesSuccess)
			.catch(this.fetchArticlesFail);
	};

	fetchArticlesSuccess = ({ data }) => {
		const { insertArticles } = this.props;

		return insertArticles(data).then(() =>
			this.asyncSetState({
				isHydrating: false,
				articles: data.map(item => item._id)
			})
		);
	};

	fetchArticlesFail = reason =>
		this.asyncSetState({
			error: parseError(reason),
			isHydrating: false
		});

	render = () => (
		<ArticlesContext.Provider
			value={{
				isHydrating: this.state.isHydrating,
				articles: this.state.articles,
				error: this.state.error,
				fetchArticlesStart: this.fetchArticlesStart
			}}
		>
			{this.props.children}
		</ArticlesContext.Provider>
	);
}

ArticlesProviderClass.propTypes = {
	fetcher: PropTypes.func.isRequired,
	insertArticles: PropTypes.func.isRequired,
	updateArticle: PropTypes.func.isRequired,
	getArticle: PropTypes.func.isRequired,
	children: PropTypes.element.isRequired
};

const ArticlesProviderClassWithAsyncSetState = withAsyncSetState(
	ArticlesProviderClass
);

const ArticlesProviderClassWithFetcherContext = props => (
	<FetcherContext.Consumer>
		{ctx => (
			<ArticlesProviderClassWithAsyncSetState
				{...props}
				fetcher={ctx.fetcher}
			/>
		)}
	</FetcherContext.Consumer>
);

const ArticlesProviderClassWithCollectionsContext = props => (
	<CollectionsContext.Consumer>
		{ctx => (
			<ArticlesProviderClassWithFetcherContext
				{...props}
				insertArticles={articles =>
					ctx.insertDocuments(ARTICLE_MODEL, articles)
				}
				getArticle={articleId => ctx.getEntity(ARTICLE_MODEL, articleId)}
				updateArticle={article =>
					ctx.updateDocument(ARTICLE_MODEL, article._id, article)
				}
			/>
		)}
	</CollectionsContext.Consumer>
);

export const ArticlesProvider = ArticlesProviderClassWithCollectionsContext;
