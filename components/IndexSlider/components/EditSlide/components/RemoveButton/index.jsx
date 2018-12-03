import React from "react";
import Button from "@components/Button";
import { EditSlideContext } from "../../context";

const RemoveButton = () => (
	<EditSlideContext.Consumer>
		{ctx => (
			<Button
				loading={ctx.removing.isHydrating}
				onClick={ctx.removeSlideStart}
				basic
				icon="close"
			>
				Удалить
			</Button>
		)}
	</EditSlideContext.Consumer>
);

export default RemoveButton;
