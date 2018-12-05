import React from "react";
import { List, Icon } from "semantic-ui-react";
import { Paragraph } from "@components/Typography";
import styles from "./styles";

const Contacts = () => (
	<List inverted>
		<List.Item className={styles.listListItem}>
			<Icon className={styles.listIcon} name="marker" />
			<List.Content>
				<List.Header className={styles.listHeader}>Адрес</List.Header>
				<Paragraph className={styles.listItem}>
					г. Владимир, ул. Комиссарова, д. 10а
				</Paragraph>
			</List.Content>
		</List.Item>

		<List.Item className={styles.listListItem}>
			<Icon className={styles.listIcon} name="clock" />
			<List.Content>
				<List.Header className={styles.listHeader}>Расписание</List.Header>
				<Paragraph className={styles.listItem}>Пн-пт с 9:00 до 18:00</Paragraph>
			</List.Content>
		</List.Item>

		<List.Item className={styles.listListItem}>
			<Icon className={styles.listIcon} name="mail" />
			<List.Content>
				<List.Header className={styles.listHeader}>Почта</List.Header>
				<Paragraph className={styles.listItem}>
					<a href="mailto:print@zolotaja-strekoza.ru">
						print@zolotaja-strekoza.ru
					</a>
				</Paragraph>
			</List.Content>
		</List.Item>

		<List.Item className={styles.listListItem}>
			<Icon className={styles.listIcon} name="phone" />
			<List.Content>
				<List.Header className={styles.listHeader}>Телефон</List.Header>
				<Paragraph className={styles.listItem}>
					<a href="tel:+79028888690">8 (902) 888-86-90</a>
				</Paragraph>
			</List.Content>
		</List.Item>
	</List>
);

export default Contacts;
