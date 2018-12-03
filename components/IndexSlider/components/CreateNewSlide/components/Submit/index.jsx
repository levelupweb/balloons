import React from "react";
import Button from "@components/Button";
import { BUTTON_VARIANT_SUCCESS } from "@components/Button/consts";
import { CreateNewSlideContext } from "../../context";

const Submit = () => (
	<CreateNewSlideContext.Consumer>
		{ctx => (
			<Button
				loading={ctx.isHydrating}
				basic
				icon="check"
				variant={BUTTON_VARIANT_SUCCESS}
				onClick={ctx.createSlideStart}
			>
				Готово
			</Button>
		)}
	</CreateNewSlideContext.Consumer>
);

export default Submit;
