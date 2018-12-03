import React from "react";
import Input from "@components/Input";
import { CreateNewSlideContext } from "../../context";
import { SLIDE_TITLE } from "@consts/slide";

const Title = () => (
	<CreateNewSlideContext.Consumer>
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
	</CreateNewSlideContext.Consumer>
);

export default Title;
