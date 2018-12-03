import React from "react";
import TextArea from "@components/TextArea";
import { CreateNewSlideContext } from "../../context";
import { SLIDE_DESCRIPTION } from "@consts/slide";

const Description = () => (
	<CreateNewSlideContext.Consumer>
		{ctx => (
			<TextArea
				fluid
				autoHeight
				error={ctx.getTypeError(SLIDE_DESCRIPTION)}
				placeholder="Введите текст под заголовком.."
				value={ctx.temporarySlide[SLIDE_DESCRIPTION]}
				onChange={(_, value) =>
					ctx.handleTemporarySlide({
						[SLIDE_DESCRIPTION]: value
					})
				}
			/>
		)}
	</CreateNewSlideContext.Consumer>
);

export default Description;
