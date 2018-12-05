import React from "react";
import classes from "classnames";
import Margin from "@components/Margin";
import Socials from "./components/Socials";
import Navigation from "./components/Navigation";
import Copyright from "./components/Copyright";
import Contacts from "./components/Contacts";
import Logo from "./components/Logo";
import FooterHeader from "./components/FooterHeader";
import styles from "./styles";

const Footer = () => (
	<div className={styles.body}>
		<div className={classes(styles.column, styles.c1)}>
			<div className={styles.logoWrapper}>
				<Logo />
			</div>
			<Margin top>
				<div className={styles.socials}>
					<Socials />
				</div>
			</Margin>
			<Margin top>
				<div className={styles.copyright}>
					<Copyright />
				</div>
			</Margin>
		</div>
		<div className={classes(styles.column, styles.c2)}>
			<div className={styles.nav}>
				<Navigation
					title="О компании"
					links={[
						{
							title: "Контактная информация",
							link: "/"
						},
						{
							title: "Наши реквизиты",
							link: "/"
						},
						{
							title: "Сотрудничество",
							link: "/"
						}
					]}
				/>
			</div>
			<div className={styles.nav}>
				<Navigation
					title="Полезная информация"
					links={[
						{
							title: "Оплата и доставка",
							link: "/"
						},
						{
							title: "Наши услуги",
							link: "/"
						},
						{
							title: "Активные акции",
							link: "/"
						},
						{
							title: "Наши работы",
							link: "/"
						}
					]}
				/>
			</div>
		</div>
		<div className={classes(styles.column, styles.c3)}>
			<FooterHeader>Контактная информация</FooterHeader>
			<Contacts />
		</div>
	</div>
);

export default Footer;
