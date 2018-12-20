import React from "react";
import { TextArea } from "semantic-ui-react";
import { PORTFOLIO_DESCRIPTION } from "@consts/portfolio";
import { CreatePortfolioContext } from "../../context";

const Description = () => (
	<CreatePortfolioContext.Consumer>
		{ctx => (
			<TextArea
				fluid
				value={ctx.data[PORTFOLIO_DESCRIPTION]}
				onChange={(_, { value }) =>
					ctx.handleData({
						[PORTFOLIO_DESCRIPTION]: value
					})
				}
				placeholder="Введите небольшое описание к вашему порфтолио"
				autoHeight
				rows={2}
			/>
		)}
	</CreatePortfolioContext.Consumer>
);

export default Description;
