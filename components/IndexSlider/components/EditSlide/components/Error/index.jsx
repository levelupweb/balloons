import React from "react";
import Notification from "@components/Notification";
import { NOTIFICATION_VARIANT_DANGER } from "@components/Notification/consts";
import { EditSlideContext } from "../../context";

const Error = () => (
	<EditSlideContext.Consumer>
		{ctx =>
			ctx.error && (
				<Notification
					variant={NOTIFICATION_VARIANT_DANGER}
					content={ctx.error}
				/>
			)
		}
	</EditSlideContext.Consumer>
);

export default Error;
