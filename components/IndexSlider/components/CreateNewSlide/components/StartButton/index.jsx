import React from "react";
import Button from "@components/Button";
import { CreateNewSlideContext } from "../../context";
import styles from "./styles";

const StartButton = () => (
	<CreateNewSlideContext.Consumer>
		{ctx => (
			<Button
				className={styles.createButton}
				onClick={() => ctx.handleCreating(true)}
				icon="add"
			>
				Создать слайд
			</Button>
		)}
	</CreateNewSlideContext.Consumer>
);

export default StartButton;
