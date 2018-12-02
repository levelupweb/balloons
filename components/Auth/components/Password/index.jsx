import React from "react";
import Input from "@components/Input";
import { AuthComponentContext } from "../../context";
import { USER_PASSWORD } from "@consts/user";

const Password = () => (
	<AuthComponentContext.Consumer>
		{ctx => (
			<Input
				type="password"
				name="user_password"
				label="Пароль от аккаунта"
				error={ctx.getTypeErrorMessage(USER_PASSWORD)}
				fluid
				onChange={(_, value) =>
					ctx.handleCredentials({
						[USER_PASSWORD]: value
					})
				}
				value={ctx.credentials[USER_PASSWORD]}
			/>
		)}
	</AuthComponentContext.Consumer>
);

export default Password;
