import React from "react";
import { Button } from "semantic-ui-react";
import { CreateNewSlideContext } from "../../context";

const Submit = () => (
	<CreateNewSlideContext.Consumer>
		{ctx => (
			<Button
				loading={ctx.isHydrating}
				color="green"
				onClick={ctx.createSlideStart}
			>
				Создать
			</Button>
		)}
	</CreateNewSlideContext.Consumer>
);

export default Submit;
