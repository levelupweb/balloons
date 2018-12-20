import React from "react";
import { Grid } from "semantic-ui-react";
import Margin from "@components/Margin";
import Socials from "./components/Socials";
import FooterNav from "./components/FooterNav";
import Copyright from "./components/Copyright";
import FooterList from "./components/FooterList";
import Logo from "./components/Logo";
import FooterHeader from "./components/FooterHeader";
import styles from "./styles";

const Footer = () => (
	<div className={styles.wrapper}>
		<Grid stackable columns={3}>
			<Grid.Column>
				<div className={styles.c1}>
					<div className={styles.top}>
						<Logo />
						<Margin top>
							<FooterList>
								{[
									[
										"Адрес",
										" г. Москва, Измайловское шоссе, 73Ж, 3 этаж",
										"marker"
									],
									["Раписание", "Пн-пт с 9:00 до 18:00", "clock"]
								]}
							</FooterList>
						</Margin>
					</div>

					<Margin top>
						<Socials />
					</Margin>
				</div>
			</Grid.Column>
			<Grid.Column>
				<FooterNav title="О компании">
					{[
						["Контактная информация", "/kontaktnaya-informaciya"],
						["Наши реквизиты", "/article/nashi-rekvizity"],
						["Сотрудничество", "/sotrudnichestvo"]
					]}
				</FooterNav>
				<Margin top double>
					<FooterNav title="Полезная информация">
						{[
							["Оплата и доставка", "/article/oplata-i-dostavka"],
							["Наши услуги", "/article/ceny"],
							["Активные акции", "/sales"],
							["Наши работы", "/portfolio"]
						]}
					</FooterNav>
				</Margin>
			</Grid.Column>
			<Grid.Column>
				<div className={styles.c3}>
					<div className={styles.top}>
						<FooterHeader>Контактная информация</FooterHeader>
						<FooterList>
							{[
								[
									"E-mail",
									"print@zolotaja-strekoza.ru",
									"mail",
									"mailto:print@zolotaja-strekoza.ru"
								],
								["Телефон", "8 (495) 960-25-10", "phone", "tel:+74959602510"]
							]}
						</FooterList>
					</div>
					<Margin top>
						<Copyright />
					</Margin>
				</div>
			</Grid.Column>
		</Grid>
	</div>
);

export default Footer;
