import React from "react";
import PropTypes from "prop-types";
import { NEWS_CONTENT } from "@consts/news";
import Editor from "@components/Editor";
import ArticleRenderer from "@components/ArticleRenderer";
import { NewsSingleContext } from "../../context";
import styles from "./styles";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Content = ({ content, isEditing, handleChange }) => {
	if (isEditing) {
		return (
			<div className={styles.wrapper}>
				<Editor html={content} onChange={html => handleChange(html)} />
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

const ContentWithNewsSingleContext = props => (
	<NewsSingleContext.Consumer>
		{ctx => (
			<Content
				{...props}
				content={ctx.getField(NEWS_CONTENT)}
				isEditing={ctx.isEditing}
				handleChange={value =>
					ctx.handleTemporaryData({
						[NEWS_CONTENT]: value
					})
				}
			/>
		)}
	</NewsSingleContext.Consumer>
);
export default ContentWithNewsSingleContext;
