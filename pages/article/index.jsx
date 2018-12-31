import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { createAxios, parseError, parseToken } from "@utils";
import DefaultContainer from "@containers/Default";
import ArticleSingle from "@components/ArticleSingle";
import { ARTICLE_CATEGORY } from "@consts/article";
import { getArticle, getOtherArticles } from "./utils";
import { ARTICLE_TITLE } from "../../consts/article";

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
					title: article.data[ARTICLE_TITLE],
					collectionsArticles: [article.data, ...otherArticles.data] // inserting articles in collections
				};
			}

			return {
				...answer,
				title: article.data[ARTICLE_TITLE],
				collectionsArticles: [article.data] // inserting articles in collections
			};
		} catch (err) {
			return {
				article: null,
				isEditing: false,
				error: parseError(err),
				title: "Не найдено"
			};
		}
	}

	render = () => {
		const { article, error, title, isEditing, otherArticlesIds } = this.props;

		return (
			<DefaultContainer>
				<Head>
					<title>{title} - Золотая стрекоза</title>
				</Head>
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
	title: PropTypes.string.isRequired,
	isEditing: PropTypes.bool,
	otherArticlesIds: PropTypes.arrayOf(PropTypes.string)
};

ArticlePage.defaultProps = {
	article: null,
	otherArticles: null,
	error: null,
	isEditing: false
};

ArticlePage.requireAuth = false;

export default ArticlePage;
