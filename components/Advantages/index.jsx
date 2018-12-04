import React from "react";
import PropTypes from "prop-types";
import styles from "./styles";
import Margin from "@components/Margin";
import { Heading, Paragraph } from "@components/Typography";

const Advantages = ({ children }) => (
	<div className={styles.items}>
		{children.map((item, index) => {
			const [title, description, img] = item;

			return (
				<div className={styles.item} key={index}>
					<div className={styles.inner}>
						<img src={img} width={62} title={title} />
						<Margin top>
							<Heading as="h4" size={5}>
								{title}
							</Heading>
							<Margin top half>
								<Paragraph>{description}</Paragraph>
							</Margin>
						</Margin>
					</div>
				</div>
			);
		})}
	</div>
);

Advantages.propTypes = {
	children: PropTypes.arrayOf(PropTypes.array)
};

export default Advantages;
