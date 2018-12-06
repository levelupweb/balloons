import React from "react";
import PropTypes from "prop-types";
import { Segment, Grid, Form } from "semantic-ui-react";
import Margin from "@components/Margin";
import { Paragraph } from "@components/Typography";
import Block from "@components/Block";
import Title from "./components/Title";
import Sidebar from "./components/Sidebar";
import Description from "./components/Description";
import Actions from "./components/Actions";
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
			<Grid>
				<Grid.Column mobile={16} tablet={12} computer={11}>
					<main className={styles.main}>
						<Block>
							<Form>
								<div className={styles.title}>
									<Meta />
									<Title />
									<Margin top>
										<Description />
									</Margin>
								</div>
							</Form>
							<div className={styles.content}>
								<Margin top>
									<Content />
								</Margin>
								<Margin top>
									<Actions />
								</Margin>
							</div>
						</Block>
					</main>
				</Grid.Column>
				<Grid.Column mobile={16} tablet={4} computer={5}>
					<aside className={styles.sidebar}>
						<Sidebar />
					</aside>
				</Grid.Column>
			</Grid>
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
