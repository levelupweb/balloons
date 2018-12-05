import React from "react";
import { Input, Popup } from "semantic-ui-react";
import { AuthComponentContext } from "../../context";
import { USER_LOGIN } from "@consts/user";

const Login = () => (
	<AuthComponentContext.Consumer>
		{ctx => (
			<Popup
				open={!!ctx.getTypeErrorMessage(USER_LOGIN)}
				trigger={
					<Input
						type="text"
						name="user_login"
						placeholder="Персональный логин"
						error={!!ctx.getTypeErrorMessage(USER_LOGIN)}
						fluid
						onChange={(_, { value }) =>
							ctx.handleCredentials({
								[USER_LOGIN]: value
							})
						}
						value={ctx.credentials[USER_LOGIN]}
					/>
				}
			>
				{ctx.getTypeErrorMessage(USER_LOGIN)}
			</Popup>
		)}
	</AuthComponentContext.Consumer>
);

export default Login;
