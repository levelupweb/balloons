import React from "react";
import Margin from "@components/Margin";
import { Paragraph } from "@components/Typography";
import styles from "./styles";

const Logo = () => (
	<React.Fragment>
		<img src={require("../..//img/logo.png")} className={styles.logo} />

		<Margin top>
			<Paragraph className={styles.paragraph}>
				{`Общество с ограниченной ответственностью "Золотая стрекоза". Работает на
				российском рынке с 2010 года`}
			</Paragraph>
		</Margin>
	</React.Fragment>
);

export default Logo;
