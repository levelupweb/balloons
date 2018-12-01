import React from "react";
import Link from "next/link";
import { Heading, Paragraph } from "@components/Typography";
import styles from "./styles";

const Header = () => (
	<div className={styles.header}>
		<div className={styles.logo}>
			<Link href="/">
				<a>
					<img
						title="Золотая стрекоза - печать на воздушных шарах"
						className={styles.image}
						src={require("./img/logo.png")}
					/>
				</a>
			</Link>
			<div className={styles.text}>
				<Heading className={styles.primary} as="h1" size={3}>
					Золотая стрекоза
				</Heading>
				<Heading className={styles.secondary} as="h2" size={5}>
					Печать на воздушных шарах
				</Heading>
			</div>
		</div>
		<div className={styles.contact}>
			<Heading thin as="p" size={3}>
				8 (920) 888-86-90
			</Heading>
			<Paragraph>г. Владимир, ул. Комиссарова, дом 10а</Paragraph>
		</div>
	</div>
);

export default Header;
