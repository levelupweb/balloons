import React from "react";
import PropTypes from "prop-types";
import { List } from "semantic-ui-react";
import FooterHeader from "../FooterHeader";
import styles from "./styles";

const FooterNav = ({ children, title }) => (
	<List>
		<FooterHeader>{title}</FooterHeader>
		{children.map((item, index) => {
			const [title, link] = item;

			return (
				<List.Item key={index} className={styles.item}>
					<List.Content>
						<a href={link} className={styles.title}>
							{title}
						</a>
					</List.Content>
				</List.Item>
			);
		})}
	</List>
);

FooterNav.propTypes = {
	children: PropTypes.arrayOf(PropTypes.object).isRequired,
	title: PropTypes.string.isRequired
};

export default FooterNav;
