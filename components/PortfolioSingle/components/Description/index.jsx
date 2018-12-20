import React from "react";
import PropTypes from "prop-types";
import { TextArea } from "semantic-ui-react";
import Margin from "@components/Margin";
import { PORTFOLIO_DESCRIPTION } from "@consts/portfolio";
import Field from "@components/Field";
import { Paragraph } from "@components/Typography";
import { PortfolioSingleContext } from "../../context";

const Description = ({ description, isEditing, handleChange, hasError }) => {
	if (isEditing) {
		return (
			<Margin top>
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
			</Margin>
		);
	}

	if (description) {
		return <Paragraph sub>{description}</Paragraph>;
	}

	return null;
};

Description.propTypes = {
	description: PropTypes.string.isRequired,
	handleChange: PropTypes.func.isRequired,
	isEditing: PropTypes.bool.isRequired,
	hasError: PropTypes.bool.isRequired
};

const DescriptionWithPortfolioSingleContext = props => (
	<PortfolioSingleContext.Consumer>
		{ctx => (
			<Description
				{...props}
				isEditing={ctx.isEditing}
				description={ctx.getField(PORTFOLIO_DESCRIPTION)}
				hasError={!!ctx.getTypeError(PORTFOLIO_DESCRIPTION)}
				handleChange={value =>
					ctx.handleTemporaryData({
						[PORTFOLIO_DESCRIPTION]: value
					})
				}
			/>
		)}
	</PortfolioSingleContext.Consumer>
);

export default DescriptionWithPortfolioSingleContext;
