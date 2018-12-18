import React from "react";
import { NEWS_CONTENT, NEWS_TITLE, NEWS_DESCRIPTION } from "@consts/news";
import { Button } from "semantic-ui-react";
import { CreateNewsContext } from "../../context";

const Submit = () => (
	<CreateNewsContext.Consumer>
		{ctx => (
			<Button
				circular
				size="big"
				onClick={ctx.createNewsStart}
				color="green"
				disabled={
					ctx.data[NEWS_CONTENT].length === 0 ||
					ctx.data[NEWS_TITLE].length === 0 ||
					ctx.data[NEWS_DESCRIPTION].length === 0
				}
				loading={ctx.creating.isHydrating}
			>
				Опубликовать
			</Button>
		)}
	</CreateNewsContext.Consumer>
);

export default Submit;
