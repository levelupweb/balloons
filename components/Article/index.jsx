import React from "react";
import PropTypes from "prop-types";
import { ARTICLE_MODEL } from "@consts/_models";
import { CollectionsContext } from "@providers";

const Article = ({ children, article }) => (article ? children(article) : null);

Article.propTypes = {
	article: PropTypes.object.isRequired,
	children: PropTypes.func.isRequired
};

const ArticleWithCollectionsContext = props => (
	<CollectionsContext.Consumer>
		{ctx => (
			<Article
				{...props}
				article={ctx.getEntity(ARTICLE_MODEL, props.articleId)}
			/>
		)}
	</CollectionsContext.Consumer>
);

ArticleWithCollectionsContext.propTypes = {
	articleId: PropTypes.string.isRequired
};
export default ArticleWithCollectionsContext;
