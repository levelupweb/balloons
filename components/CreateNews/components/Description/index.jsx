import React from "react";
import { TextArea } from "semantic-ui-react";
import { NEWS_DESCRIPTION } from "@consts/news";
import { CreateNewsContext } from "../../context";

const Description = () => (
	<CreateNewsContext.Consumer>
		{ctx => (
			<TextArea
				fluid
				value={ctx.data[NEWS_DESCRIPTION]}
				onChange={(_, { value }) =>
					ctx.handleData({
						[NEWS_DESCRIPTION]: value
					})
				}
				placeholder="Введите анонс к вашей новой публикации.."
				autoHeight
				rows={2}
			/>
		)}
	</CreateNewsContext.Consumer>
);

export default Description;
