import React from "react";
import PropTypes from "prop-types";
import { ARTICLE_CONTENT } from "@consts/article";
import Editor from "@components/Editor";
import Block from "@components/Block";
import ArticleRenderer from "@components/ArticleRenderer";
import { ArticleSingleContext } from "../../context";
import styles from "./styles";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Content = ({ content, isEditing, handleChange }) => {
	if (isEditing) {
		return (
			<div className={styles.wrapper}>
				<Block className={styles.inner}>
					<Editor html={content} onChange={html => handleChange(html)} />
				</Block>
			</div>
		);
	}

	return <ArticleRenderer content={content} />;
};

Content.propTypes = {
	content: PropTypes.string.isRequired,
	isEditing: PropTypes.bool.isRequired,
	handleChange: PropTypes.func.isRequired
};

const ContentWithArticleSingleContext = props => (
	<ArticleSingleContext.Consumer>
		{ctx => (
			<Content
				{...props}
				content={ctx.temporaryArticle[ARTICLE_CONTENT]}
				isEditing={ctx.isEditing}
				handleChange={value =>
					ctx.handleTemporaryArticle({
						[ARTICLE_CONTENT]: value
					})
				}
			/>
		)}
	</ArticleSingleContext.Consumer>
);
export default ContentWithArticleSingleContext;
