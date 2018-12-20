import React from "react";
import { Input } from "semantic-ui-react";
import { PORTFOLIO_TITLE } from "@consts/portfolio";
import { CreatePortfolioContext } from "../../context";

const Title = () => (
	<CreatePortfolioContext.Consumer>
		{ctx => (
			<Input
				fluid
				value={ctx.data[PORTFOLIO_TITLE]}
				onChange={(_, { value }) =>
					ctx.handleData({
						[PORTFOLIO_TITLE]: value
					})
				}
				placeholder="Название портфолио"
			/>
		)}
	</CreatePortfolioContext.Consumer>
);

export default Title;
