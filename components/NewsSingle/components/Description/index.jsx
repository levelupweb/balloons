import React from "react";
import PropTypes from "prop-types";
import { TextArea } from "semantic-ui-react";
import { NEWS_DESCRIPTION } from "@consts/news";
import Field from "@components/Field";
import { Paragraph } from "@components/Typography";
import { NewsSingleContext } from "../../context";

const Description = ({ description, isEditing, handleChange, hasError }) => {
	if (isEditing) {
		return (
			<Field title="Анонс к новости" description="Обязательное поле">
				<TextArea
					fluid
					autoHeight
					rows={2}
					placeholder="Введите анонс к новости"
					error={hasError}
					onChange={(_, { value }) => handleChange(value)}
					value={description}
				/>
			</Field>
		);
	}

	if (description) {
		return <Paragraph lead>{description}</Paragraph>;
	}

	return null;
};

Description.propTypes = {
	description: PropTypes.string.isRequired,
	handleChange: PropTypes.func.isRequired,
	isEditing: PropTypes.bool.isRequired,
	hasError: PropTypes.bool.isRequired
};

const DescriptionWithNewsSingleContext = props => (
	<NewsSingleContext.Consumer>
		{ctx => (
			<Description
				{...props}
				isEditing={ctx.isEditing}
				description={ctx.getField(NEWS_DESCRIPTION)}
				hasError={!!ctx.getTypeError(NEWS_DESCRIPTION)}
				handleChange={value =>
					ctx.handleTemporaryData({
						[NEWS_DESCRIPTION]: value
					})
				}
			/>
		)}
	</NewsSingleContext.Consumer>
);

export default DescriptionWithNewsSingleContext;
