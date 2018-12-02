import React from "react";
import Input from "@components/Input";
import { AuthComponentContext } from "../../context";
import { USER_LOGIN } from "@consts/user";

const Login = () => (
	<AuthComponentContext.Consumer>
		{ctx => (
			<Input
				type="text"
				focused
				name="user_login"
				label="Персональный логин"
				error={ctx.getTypeErrorMessage(USER_LOGIN)}
				fluid
				onChange={(_, value) =>
					ctx.handleCredentials({
						[USER_LOGIN]: value
					})
				}
				value={ctx.credentials[USER_LOGIN]}
			/>
		)}
	</AuthComponentContext.Consumer>
);

export default Login;
