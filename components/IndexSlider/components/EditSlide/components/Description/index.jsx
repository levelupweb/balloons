import React from "react";
import TextArea from "@components/TextArea";
import { SLIDE_DESCRIPTION } from "@consts/slide";
import { EditSlideContext } from "../../context";

const Description = () => (
	<EditSlideContext.Consumer>
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
	</EditSlideContext.Consumer>
);

export default Description;
