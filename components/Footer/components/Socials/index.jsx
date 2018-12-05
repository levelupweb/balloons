import React from "react";
import { Icon } from "semantic-ui-react";
import { socials } from "./socials";
import styles from "./styles";

const Socials = () => (
	<div className={styles.socials}>
		{socials.map(social => (
			<a
				className={styles.social}
				key={social.icon}
				title={social.title}
				href={social.link}
			>
				<Icon name={social.icon} />
			</a>
		))}
	</div>
);

export default Socials;
