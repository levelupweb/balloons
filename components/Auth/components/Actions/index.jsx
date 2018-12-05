import React from "react";
import { Button } from "semantic-ui-react";
import { AuthComponentContext } from "../../context";
import styles from "./styles";

const Actions = () => (
	<AuthComponentContext.Consumer>
		{ctx => (
			<div className={styles.actions}>
				<Button
					onClick={ctx.authStart}
					fluid
					loading={ctx.isHydrating}
					size="large"
					basic
				>
					Авторизоваться
				</Button>
			</div>
		)}
	</AuthComponentContext.Consumer>
);

export default Actions;
