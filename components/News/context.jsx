import React from "react";
import PropTypes from "prop-types";
import { FetcherContext, CollectionsContext } from "@providers";
import { withAsyncSetState, fetch, parseError } from "@utils";
import { MODEL_NEWS } from "@consts/_models";
import { FETCH_NEWS } from "@consts/_fetch";

export const NewsContext = React.createContext();

class NewsProviderClass extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			displayNews: props.defaultNews,
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

	fetchNewsStart = () =>
		this.handleFetchingState({
			isHydrating: true,
			error: null
		})
			.then(this.fetchNewsProcess)
			.then(this.fetchNewsSuccess)
			.catch(this.fetchNewsFail);

	fetchNewsProcess = () => {
		const { fetcher, currentPage } = this.props;

		return fetch(fetcher, FETCH_NEWS, {
			params: {
				skip: currentPage,
				limit: 10
			}
		});
	};

	fetchNewsSuccess = ({ data }) => {
		const { insertNews } = this.props;

		return insertNews(data).then(() =>
			this.asyncSetState({
				displayNews: data.map(item => item._id),
				fetching: {
					error: null,
					isHydrating: false
				}
			})
		);
	};

	fetchNewsFail = reason =>
		this.handleFetchingState({
			isHydrating: false,
			error: parseError(reason)
		});

	render = () => (
		<NewsContext.Provider
			value={{
				fetchNewsStart: this.fetchNewsStart,
				currentPage: this.props.currentPage,
				...this.state
			}}
		>
			{this.props.children}
		</NewsContext.Provider>
	);
}

NewsProviderClass.propTypes = {
	children: PropTypes.any.isRequired,
	defaultNews: PropTypes.array,
	fetchError: PropTypes.object,
	fetcher: PropTypes.func.isRequired,
	insertNews: PropTypes.func.isRequired,
	currentPage: PropTypes.number
};

NewsProviderClass.defaultProps = {
	fetchError: null,
	currentPage: null
};

const NewsProviderWithAsyncSetState = withAsyncSetState(NewsProviderClass);

const NewsProviderWithFetcherContext = props => (
	<FetcherContext.Consumer>
		{ctx => <NewsProviderWithAsyncSetState {...props} fetcher={ctx.fetcher} />}
	</FetcherContext.Consumer>
);

const NewsProviderWithCollectionsContext = props => (
	<CollectionsContext.Consumer>
		{ctx => (
			<NewsProviderWithFetcherContext
				{...props}
				insertNews={news => ctx.insertDocuments(MODEL_NEWS, news)}
			/>
		)}
	</CollectionsContext.Consumer>
);

export const NewsProvider = NewsProviderWithCollectionsContext;
