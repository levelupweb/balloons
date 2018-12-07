import React from "react";
import PropTypes from "prop-types";
import { ARTICLE_DESCRIPTION } from "@consts/article";
import Field from "@components/Field";
import Block from "@components/Block";
import { Paragraph } from "@components/Typography";
import { TextArea } from "semantic-ui-react";
import { ArticleSingleContext } from "../../context";
import styles from "./styles";

const Description = ({ description, isEditing, handleChange, hasError }) => {
	if (isEditing) {
		return (
			<Block>
				<Field title="Аннотация к статье" description="Обязательное поле">
					<TextArea
						autoHeight
						rows={2}
						fluid
						placeholder="Введите название статьи"
						error={hasError}
						onChange={(_, { value }) => handleChange(value)}
						value={description}
					/>
				</Field>
			</Block>
		);
	}

	if (description) {
		return <Paragraph className={styles.paragraph}>{description}</Paragraph>;
	}

	return null;
};

Description.propTypes = {
	description: PropTypes.string.isRequired,
	handleChange: PropTypes.func.isRequired,
	isEditing: PropTypes.bool.isRequired,
	hasError: PropTypes.bool.isRequired
};

const DescriptionWithArticleSingleContext = props => (
	<ArticleSingleContext.Consumer>
		{ctx => (
			<Description
				{...props}
				isEditing={ctx.isEditing}
				description={ctx.temporaryArticle[ARTICLE_DESCRIPTION]}
				hasError={!!ctx.getTypeErrorMessage(ARTICLE_DESCRIPTION)}
				handleChange={value =>
					ctx.handleTemporaryArticle({
						[ARTICLE_DESCRIPTION]: value
					})
				}
			/>
		)}
	</ArticleSingleContext.Consumer>
);

export default DescriptionWithArticleSingleContext;
