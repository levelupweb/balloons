import React from "react";
import PropTypes from "prop-types";
import { List } from "semantic-ui-react";
import FooterHeader from "../FooterHeader";
import styles from "./styles";

const Navigation = ({ links, title }) => (
	<List>
		<FooterHeader>{title}</FooterHeader>
		{links.map((item, index) => (
			<List.Item key={index} className={styles.listListItem}>
				<List.Content>
					<a href={item.link} className={styles.listItem}>
						{item.title}
					</a>
				</List.Content>
			</List.Item>
		))}
	</List>
);

Navigation.propTypes = {
	links: PropTypes.arrayOf(PropTypes.object).isRequired,
	title: PropTypes.string.isRequired
};

export default Navigation;
