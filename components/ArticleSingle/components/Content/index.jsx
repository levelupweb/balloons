import React from "react";
import PropTypes from "prop-types";
import { ArticleSingleContext } from "../../context";
import { ARTICLE_CONTENT } from "@consts/article";

const Content = ({ content }) => <div>{content}</div>;

Content.propTypes = {
	content: PropTypes.string.isRequired
};

const ContentWithArticleSingleContext = props => (
	<ArticleSingleContext.Consumer>
		{ctx => (
			<Content {...props} content={ctx.temporaryArticle[ARTICLE_CONTENT]} />
		)}
	</ArticleSingleContext.Consumer>
);

export default ContentWithArticleSingleContext;
