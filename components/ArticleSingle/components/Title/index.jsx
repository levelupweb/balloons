import React from "react";
import PropTypes from "prop-types";
import { ARTICLE_TITLE } from "@consts/article";
import { ArticleSingleContext } from "../../context";

const Title = ({ title }) => <div>{title}</div>;

Title.propTypes = {
	title: PropTypes.string.isRequired
};

const TitleWithArticleSingleContext = props => (
	<ArticleSingleContext.Consumer>
		{ctx => <Title {...props} title={ctx.temporaryArticle[ARTICLE_TITLE]} />}
	</ArticleSingleContext.Consumer>
);

export default TitleWithArticleSingleContext;
