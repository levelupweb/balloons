import React from "react";
import PropTypes from "prop-types";
import { Segment } from "semantic-ui-react";
import Margin from "@components/Margin";
import { Paragraph } from "@components/Typography";
import Title from "./components/Title";
import Sidebar from "./components/Sidebar";
import Meta from "./components/Meta";
import Content from "./components/Content";
import { ArticleSingleProvider, ArticleSingleContext } from "./context";
import styles from "./styles";

const ArticleSingle = ({ fetchError, hasArticle }) => {
	if (fetchError) {
		return (
			<Segment>
				<Paragraph>{fetchError}</Paragraph>
			</Segment>
		);
	}

	if (hasArticle) {
		return (
			<div className={styles.article}>
				<main className={styles.main}>
					<div className={styles.title}>
						<Meta />
						<Title />
					</div>
					<div className={styles.content}>
						<Margin top>
							<Content />
						</Margin>
					</div>
				</main>
				<aside className={styles.sidebar}>
					<Sidebar />
				</aside>
			</div>
		);
	}

	return null;
};

ArticleSingle.propTypes = {
	fetchError: PropTypes.string,
	hasArticle: PropTypes.bool.isRequired
};

ArticleSingle.defaultProps = {
	fetchError: null
};

const ArticleSingleWithContext = props => (
	<ArticleSingleProvider
		isEditing={props.isEditing}
		article={props.article}
		error={props.error}
		otherArticlesIds={props.otherArticlesIds}
	>
		<ArticleSingleContext.Consumer>
			{ctx => (
				<ArticleSingle
					fetchError={ctx.fetchError}
					hasArticle={!!ctx.temporaryArticle}
				/>
			)}
		</ArticleSingleContext.Consumer>
	</ArticleSingleProvider>
);

ArticleSingleWithContext.propTypes = {
	isEditing: PropTypes.bool,
	article: PropTypes.object,
	otherArticlesIds: PropTypes.arrayOf(PropTypes.string),
	error: PropTypes.string
};

ArticleSingleWithContext.defaultProps = {
	article: null,
	otherArticlesIds: null,
	error: null,
	isEditing: false
};

export default ArticleSingleWithContext;
