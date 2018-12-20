import React from "react";
import PropTypes from "prop-types";
import { Segment, Grid, Form } from "semantic-ui-react";
import Margin from "@components/Margin";
import { Paragraph } from "@components/Typography";
import Block from "@components/Block";
import Sidebar from "./components/Sidebar";
import Description from "./components/Description";
import Actions from "./components/Actions";
import Image from "./components/Image";
import ErrorBox from "./components/ErrorBox";
import Meta from "./components/Meta";
import Title from "./components/Title";
import Content from "./components/Content";
import { NewsSingleProvider, NewsSingleContext } from "./context";
import styles from "./styles";

const NewsSingle = ({ fetchError, item, isEditing, hasUpdatingError }) => {
	if (fetchError) {
		return (
			<Segment>
				<Paragraph>{fetchError}</Paragraph>
			</Segment>
		);
	}

	if (item) {
		return (
			<Grid>
				<Grid.Column mobile={16} tablet={12} computer={11}>
					<main className={styles.main}>
						<Block>
							<Form>
								<div className={styles.title}>
									<Meta />
									<Margin top>
										<Image />
									</Margin>
									<Margin top>
										<Title />
									</Margin>

									<Margin top>
										<Description />
									</Margin>
								</div>
							</Form>
							<div className={styles.content}>
								<Margin top>
									<Content />
								</Margin>
								{hasUpdatingError && (
									<Margin top>
										<ErrorBox />
									</Margin>
								)}
								{isEditing && (
									<Margin top>
										<Actions />
									</Margin>
								)}
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

NewsSingle.propTypes = {
	fetchError: PropTypes.string,
	item: PropTypes.object.isRequired,
	hasUpdatingError: PropTypes.bool.isRequired,
	isEditing: PropTypes.bool.isRequired
};

NewsSingle.defaultProps = {
	fetchError: null
};

const NewsSingleWithContext = props => (
	<NewsSingleProvider
		defaultEditing={props.defaultEditing}
		fetchError={props.fetchError}
		newsId={props.newsId}
		otherIds={props.otherIds}
	>
		<NewsSingleContext.Consumer>
			{ctx => (
				<NewsSingle
					isEditing={ctx.isEditing}
					fetchError={ctx.fetchError}
					hasUpdatingError={!!ctx.updating.error || !!ctx.updating.typeErrors}
					item={ctx.item}
				/>
			)}
		</NewsSingleContext.Consumer>
	</NewsSingleProvider>
);

NewsSingleWithContext.propTypes = {
	defaultEditing: PropTypes.bool,
	fetchError: PropTypes.string,
	newsId: PropTypes.string,
	otherIds: PropTypes.array
};

NewsSingleWithContext.defaultProps = {
	defaultEditing: false,
	otherIds: null,
	fetchError: null,
	newsId: null
};

export default NewsSingleWithContext;
