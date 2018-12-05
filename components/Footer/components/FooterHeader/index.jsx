import React from "react";
import PropTypes from "prop-types";
import { Heading } from "@components/Typography";
import styles from "./styles";

const FooterHeader = ({ children }) => (
	<Heading className={styles.head} as="h4" size={6}>
		{children}
	</Heading>
);

FooterHeader.propTypes = {
	children: PropTypes.string.isRequired
};

export default FooterHeader;
