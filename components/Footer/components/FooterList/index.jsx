import React from "react";
import PropTypes from "prop-types";
import { List, Icon } from "semantic-ui-react";
import { Paragraph } from "@components/Typography";
import styles from "./styles";

const FooterList = ({ children }) => (
	<List inverted>
		{children.map((item, index) => {
			const [title, content, icon, href] = item;
			return (
				<List.Item key={index} className={styles.item}>
					<Icon className={styles.icon} name={icon} />
					<List.Content>
						<List.Header className={styles.title}>{title}</List.Header>
						{href ? (
							<a href={href} className={styles.content}>
								{content}
							</a>
						) : (
							<Paragraph className={styles.content}>{content}</Paragraph>
						)}
					</List.Content>
				</List.Item>
			);
		})}
	</List>
);

FooterList.propTypes = {
	children: PropTypes.array.isRequired
};

export default FooterList;
