import React from "react";
import { Input } from "semantic-ui-react";
import { NEWS_TITLE } from "@consts/news";
import { CreateNewsContext } from "../../context";

const Title = () => (
	<CreateNewsContext.Consumer>
		{ctx => (
			<Input
				fluid
				value={ctx.data[NEWS_TITLE]}
				onChange={(_, { value }) =>
					ctx.handleData({
						[NEWS_TITLE]: value
					})
				}
				placeholder="Заголовок публикации"
			/>
		)}
	</CreateNewsContext.Consumer>
);

export default Title;
