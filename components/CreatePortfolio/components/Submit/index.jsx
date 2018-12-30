import React from "react";
import { PORTFOLIO_TITLE, PORTFOLIO_DESCRIPTION } from "@consts/portfolio";
import { Button } from "semantic-ui-react";
import { CreatePortfolioContext } from "../../context";

const Submit = () => (
	<CreatePortfolioContext.Consumer>
		{ctx => (
			<Button
				circular
				size="big"
				onClick={ctx.createPortfolioStart}
				color="green"
				disabled={
					ctx.data[PORTFOLIO_TITLE].length === 0 ||
					ctx.data[PORTFOLIO_DESCRIPTION].length === 0
				}
				loading={ctx.creating.isHydrating}
			>
				Опубликовать
			</Button>
		)}
	</CreatePortfolioContext.Consumer>
);

export default Submit;
