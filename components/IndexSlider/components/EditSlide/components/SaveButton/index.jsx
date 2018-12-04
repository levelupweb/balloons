import React from "react";
import { Button } from "semantic-ui-react";
import { EditSlideContext } from "../../context";

const SaveButton = () => (
	<EditSlideContext.Consumer>
		{ctx => (
			<Button onClick={ctx.updateSlideStart} loading={ctx.updating.isHydrating}>
				Сохранить
			</Button>
		)}
	</EditSlideContext.Consumer>
);

export default SaveButton;
