import React from "react";
import { Button } from "semantic-ui-react";
import { CreateNewSlideContext } from "../../context";
import styles from "./styles";

const StartButton = () => (
	<CreateNewSlideContext.Consumer>
		{ctx => (
			<Button
				fluid
				className={styles.createButton}
				onClick={() => ctx.handleCreating(true)}
				icon="add"
				color="green"
			>
				Создать слайд
			</Button>
		)}
	</CreateNewSlideContext.Consumer>
);

export default StartButton;
