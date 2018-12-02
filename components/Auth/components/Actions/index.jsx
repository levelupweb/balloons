import React from "react";
import { BUTTON_VARIANT_PRIMARY } from "@components/Button/consts";
import Button from "@components/Button";
import { AuthComponentContext } from "../../context";
import styles from "./styles";

const Actions = () => (
	<AuthComponentContext.Consumer>
		{ctx => (
			<div className={styles.actions}>
				<Button
					variant={BUTTON_VARIANT_PRIMARY}
					onClick={ctx.authStart}
					loading={ctx.isHydrating}
				>
					Авторизоваться
				</Button>
			</div>
		)}
	</AuthComponentContext.Consumer>
);

export default Actions;
