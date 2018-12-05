import React from "react";
import { Input, Popup } from "semantic-ui-react";
import { AuthComponentContext } from "../../context";
import { USER_PASSWORD } from "@consts/user";

const Password = () => (
	<AuthComponentContext.Consumer>
		{ctx => (
			<Popup
				open={!!ctx.getTypeErrorMessage(USER_PASSWORD)}
				trigger={
					<Input
						type="password"
						name="user_password"
						placeholder="Пароль при регистрации"
						error={!!ctx.getTypeErrorMessage(USER_PASSWORD)}
						fluid
						onChange={(_, { value }) =>
							ctx.handleCredentials({
								[USER_PASSWORD]: value
							})
						}
						value={ctx.credentials[USER_PASSWORD]}
					/>
				}
			>
				{ctx.getTypeErrorMessage(USER_PASSWORD)}
			</Popup>
		)}
	</AuthComponentContext.Consumer>
);

export default Password;
