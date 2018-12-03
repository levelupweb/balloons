import React from "react";
import Button from "@components/Button";
import { EditSlideContext } from "../../context";

const SaveButton = () => (
	<EditSlideContext.Consumer>
		{ctx => (
			<Button
				basic
				onClick={ctx.updateSlideStart}
				loading={ctx.updating.isHydrating}
				icon="check"
			>
				Сохранить
			</Button>
		)}
	</EditSlideContext.Consumer>
);

export default SaveButton;
