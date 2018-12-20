import React from "react";
import { Button } from "semantic-ui-react";
import { NewsSingleContext } from "../../context";
import styles from "./styles";

const Actions = () => (
	<NewsSingleContext.Consumer>
		{ctx => (
			<div className={styles.actions}>
				<Button circular onClick={() => ctx.handleIsEditing(false)}>
					Отменить изменения
				</Button>
				<Button
					circular
					color="green"
					onClick={() => ctx.updateNewsStart()}
					loading={ctx.updating.isHydrating}
				>
					Сохранить изменения
				</Button>
			</div>
		)}
	</NewsSingleContext.Consumer>
);

export default Actions;
