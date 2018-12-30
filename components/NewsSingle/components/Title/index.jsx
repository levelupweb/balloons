import React from "react";
import PropTypes from "prop-types";
import { Input } from "semantic-ui-react";
import { NEWS_TITLE } from "@consts/news";
import Field from "@components/Field";
import { Heading } from "@components/Typography";
import { NewsSingleContext } from "../../context";

const Title = ({ title, isEditing, handleChange, hasError }) => {
	if (isEditing) {
		return (
			<Field title="Заголовок" description="Обязательное поле">
				<Input
					fluid
					placeholder="Введите заголовок новости"
					error={hasError}
					onChange={(_, { value }) => handleChange(value)}
					value={title}
				/>
			</Field>
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
	hasError: PropTypes.bool.isRequired
};

const TitleWithNewsSingleContext = props => (
	<NewsSingleContext.Consumer>
		{ctx => (
			<Title
				{...props}
				isEditing={ctx.isEditing}
				title={ctx.getField(NEWS_TITLE)}
				hasError={!!ctx.getTypeError(NEWS_TITLE)}
				handleChange={value =>
					ctx.handleTemporaryData({
						[NEWS_TITLE]: value
					})
				}
			/>
		)}
	</NewsSingleContext.Consumer>
);

export default TitleWithNewsSingleContext;
