import React from "react";
import { Button } from "semantic-ui-react";
import { EditSlideContext } from "../../context";

const RemoveButton = () => (
	<EditSlideContext.Consumer>
		{ctx => (
			<Button loading={ctx.removing.isHydrating} onClick={ctx.removeSlideStart}>
				Удалить
			</Button>
		)}
	</EditSlideContext.Consumer>
);

export default RemoveButton;
