import React from "react";
import PropTypes from "prop-types";
import { ARTICLE_TITLE } from "@consts/article";
import Field from "@components/Field";
import Block from "@components/Block";
import { Heading } from "@components/Typography";
import { Popup, Input } from "semantic-ui-react";
import { ArticleSingleContext } from "../../context";

const Title = ({ title, isEditing, handleChange, error }) => {
	if (isEditing) {
		return (
			<Block>
				<Field title="Название статьи" description="Обязательное поле">
					<Popup
						trigger={
							<Input
								fluid
								placeholder="Введите название статьи"
								error={!!error}
								onChange={(_, { value }) => handleChange(value)}
								value={title}
							/>
						}
						open={!!error}
					>
						{error}
					</Popup>
				</Field>
			</Block>
		);
	}

	if (title) {
		return (
			<Heading as="h2" size={2}>
				{title}
			</Heading>
		);
	}

	return null;
};

Title.propTypes = {
	title: PropTypes.string.isRequired,
	handleChange: PropTypes.func.isRequired,
	isEditing: PropTypes.bool.isRequired,
	error: PropTypes.string
};

Title.defaultProps = {
	error: null
};

const TitleWithArticleSingleContext = props => (
	<ArticleSingleContext.Consumer>
		{ctx => (
			<Title
				{...props}
				isEditing={ctx.isEditing}
				title={ctx.temporaryArticle[ARTICLE_TITLE]}
				error={ctx.getTypeErrorMessage(ARTICLE_TITLE)}
				handleChange={value =>
					ctx.handleTemporaryArticle({
						[ARTICLE_TITLE]: value
					})
				}
			/>
		)}
	</ArticleSingleContext.Consumer>
);

export default TitleWithArticleSingleContext;
