import React from "react";
import { Paragraph } from "@components/Typography";
import styles from "./styles";

const Copyright = () => (
	<div className={styles.wrapper}>
		<Paragraph className={styles.paragraph}>Все права защищены</Paragraph>
		<Paragraph className={styles.paragraph}>
			Разработано в{" "}
			<a href="https://web.levelupworlds.com" rel="noreferrer noopener">
				web.levelupworlds.com
			</a>
		</Paragraph>
	</div>
);

export default Copyright;
