import React from "react";
import PropTypes from "prop-types";
import Margin from "@components/Margin";
import { Heading } from "@components/Typography";
import styles from "./styles";

const BlockHeader = ({ title, description }) => (
	<Margin bottom className={styles.blockHeader}>
		<Heading as="h2">{title}</Heading>
		<Heading sub size={5} as="h3">
			{description}
		</Heading>
	</Margin>
);

BlockHeader.propTypes = {
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired
};

export default BlockHeader;
