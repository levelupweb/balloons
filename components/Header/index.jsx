import React from "react";
import Link from "next/link";
import { Heading, Paragraph } from "@components/Typography";
import Button from "@components/Button";
import { BUTTON_VARIANT_PRIMARY } from "@components/Button/consts";
import CallMeBack from "@components/CallMeBack";
import Margin from "@components/Margin";
import styles from "./styles";

const Header = () => (
	<div className={styles.header}>
		<div className={styles.logo}>
			<Link href="/">
				<a className="simple">
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
				<Paragraph className={styles.secondary}>
					Печать на воздушных шарах
				</Paragraph>
			</div>
		</div>
		<div className={styles.contact}>
			<Heading as="p" size={4}>
				8 (920) 888-86-90
			</Heading>
			<Paragraph>г. Владимир, ул. Комиссарова, дом 10а</Paragraph>
			<Margin top half>
				<CallMeBack>
					<Button withShadow variant={BUTTON_VARIANT_PRIMARY}>
						Обратный звонок
					</Button>
				</CallMeBack>
			</Margin>
		</div>
	</div>
);

export default Header;
