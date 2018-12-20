import React from "react";
import { Button } from "semantic-ui-react";
import { PortfolioSingleContext } from "../../context";
import styles from "./styles";

const Actions = () => (
	<PortfolioSingleContext.Consumer>
		{ctx => (
			<div className={styles.actions}>
				<Button circular onClick={() => ctx.handleIsEditing(false)}>
					Отменить изменения
				</Button>
				<Button
					circular
					color="green"
					onClick={() => ctx.updatePortfolioStart()}
					loading={ctx.updating.isHydrating}
				>
					Сохранить изменения
				</Button>
			</div>
		)}
	</PortfolioSingleContext.Consumer>
);

export default Actions;
