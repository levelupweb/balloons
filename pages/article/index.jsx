import React from "react";
import PropTypes from "prop-types";
import { createAxios, parseError, parseToken } from "@utils";
import DefaultContainer from "@containers/Default";
import ArticleSingle from "@components/ArticleSingle";
import { ARTICLE_CATEGORY } from "@consts/article";
import { getArticle, getOtherArticles } from "./utils";

class ArticlePage extends React.Component {
	static async getInitialProps({ req, query: { slug, edit } }) {
		const axiosInstance = await createAxios(parseToken(req));

		try {
			const article = await getArticle(axiosInstance, slug);

			const answer = {
				isEditing: Boolean(edit),
				article: article.data,
				error: null
			};

			if (article.data[ARTICLE_CATEGORY]) {
				const otherArticles = await getOtherArticles(
					axiosInstance,
					article.data
				);

				answer.otherArticlesIds = otherArticles.data.map(
					article => article._id
				);

				return {
					...answer,
					collectionsArticles: [article.data, ...otherArticles.data] // inserting articles in collections
				};
			}

			return {
				...answer,
				collectionsArticles: [article.data] // inserting articles in collections
			};
		} catch (err) {
			return {
				article: null,
				isEditing: false,
				error: parseError(err)
			};
		}
	}

	render = () => {
		const { article, error, isEditing, otherArticlesIds } = this.props;

		return (
			<DefaultContainer>
				<ArticleSingle
					otherArticlesIds={otherArticlesIds}
					article={article}
					error={error}
					isEditing={isEditing}
				/>
			</DefaultContainer>
		);
	};
}

ArticlePage.propTypes = {
	article: PropTypes.object,
	error: PropTypes.string,
	isEditing: PropTypes.bool,
	otherArticlesIds: PropTypes.arrayOf(PropTypes.string)
};

ArticlePage.defaultProps = {
	article: null,
	otherArticles: null,
	error: null,
	isEditing: false
};

ArticlePage.requireAuth = true;

export default ArticlePage;
