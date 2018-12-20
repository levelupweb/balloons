import React from "react";
import Link from "next/link";
import { Heading, Paragraph } from "@components/Typography";
import { Button } from "semantic-ui-react";
import CallMeBack from "@components/CallMeBack";
import Margin from "@components/Margin";
import styles from "./styles";

const Header = () => (
	<div className={styles.header}>
		<div className={styles.logo}>
			<Link href="/">
				<a className="simple">
					<img
						src={require("./img/logo.png")}
						title="Золотая стрекоза - печать на воздушных шарах"
					/>
				</a>
			</Link>
		</div>
		<div className={styles.contact}>
			<Heading as="p" size={4}>
				8 (495) 960-25-10
			</Heading>
			<Paragraph>г. Москва, Измайловское шоссе, 73Ж</Paragraph>
			<Margin top half>
				<CallMeBack>
					<Button className={styles.call} icon circular primary>
						Обратный звонок
					</Button>
				</CallMeBack>
			</Margin>
		</div>
	</div>
);

export default Header;
