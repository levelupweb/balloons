import React from "react";
import Input from "@components/Input";
import { SLIDE_TITLE } from "@consts/slide";
import { EditSlideContext } from "../../context";

const Title = () => (
	<EditSlideContext.Consumer>
		{ctx => (
			<Input
				fluid
				error={ctx.getTypeError(SLIDE_TITLE)}
				placeholder="Введите заголовок для слайда"
				value={ctx.temporarySlide[SLIDE_TITLE]}
				onChange={(_, value) =>
					ctx.handleTemporarySlide({
						[SLIDE_TITLE]: value
					})
				}
			/>
		)}
	</EditSlideContext.Consumer>
);

export default Title;
