import React from "react";
import Margin from "@components/Margin";
import { Paragraph, Heading } from "@components/Typography";
import styles from "./styles";

const Logo = () => (
	<React.Fragment>
		<div className={styles.logoWrapper}>
			<img src={require("../../img/logo_min.png")} className={styles.logo} />
			<div className={styles.content}>
				<Heading as="h2" className={styles.title} size={4}>
					Золотая стрекоза
				</Heading>
				<Heading as="h4" className={styles.description} size={6}>
					Печать на воздушных шарах
				</Heading>
			</div>
		</div>

		<Margin top>
			<Paragraph className={styles.paragraph}>
				{`Общество с ограниченной ответственностью "Золотая стрекоза". Работает на
				российском рынке с 2010 года`}
			</Paragraph>
		</Margin>
	</React.Fragment>
);

export default Logo;
