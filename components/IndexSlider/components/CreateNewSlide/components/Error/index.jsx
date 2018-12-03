import React from "react";
import Notification from "@components/Notification";
import { CreateNewSlideContext } from "../../context";

const Error = () => (
	<CreateNewSlideContext.Consumer>
		{ctx => ctx.error && <Notification content={ctx.error} />}
	</CreateNewSlideContext.Consumer>
);

export default Error;
