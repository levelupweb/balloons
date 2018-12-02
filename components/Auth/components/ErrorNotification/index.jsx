import React from "react";
import Notification from "@components/Notification";
import { NOTIFICATION_VARIANT_DANGER } from "@components/Notification/consts";
import { AuthComponentContext } from "../../context";

const ErrorNotification = () => (
	<AuthComponentContext.Consumer>
		{ctx => (
			<Notification content={ctx.error} variant={NOTIFICATION_VARIANT_DANGER} />
		)}
	</AuthComponentContext.Consumer>
);

export default ErrorNotification;
