import React from "react";
import { Icon } from "semantic-ui-react";
import styles from "./styles";

const socials = [
	{
		link: "https://google.com",
		title: "Twitter",
		icon: "twitter"
	},
	{
		link: "https://google.com",
		title: "Facebook",
		icon: "facebook"
	},
	{
		link: "https://vk.com",
		title: "Vk",
		icon: "vk"
	},
	{
		link: "https://google.com",
		title: "Google +",
		icon: "google"
	}
];

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
