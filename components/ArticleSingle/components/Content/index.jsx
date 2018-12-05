import React from "react";
import PropTypes from "prop-types";
import { ArticleSingleContext } from "../../context";
import { ARTICLE_CONTENT } from "@consts/article";

const Content = ({ title }) => <div>{title}</div>;

Content.propTypes = {
	title: PropTypes.string.isRequired
};

const ContentWithArticleSingleContext = props => (
	<ArticleSingleContext.Consumer>
		{ctx => (
			<Content {...props} title={ctx.temporaryArticle[ARTICLE_CONTENT]} />
		)}
	</ArticleSingleContext.Consumer>
);

export default ContentWithArticleSingleContext;
