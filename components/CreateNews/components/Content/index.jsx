import React from "react";
import Editor from "@components/Editor";
import { NEWS_CONTENT } from "@consts/news";
import { CreateNewsContext } from "../../context";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Content = () => (
	<CreateNewsContext.Consumer>
		{ctx => (
			<Editor
				html={ctx.data[NEWS_CONTENT]}
				onChange={html =>
					ctx.handleData({
						[NEWS_CONTENT]: html
					})
				}
			/>
		)}
	</CreateNewsContext.Consumer>
);

export default Content;
