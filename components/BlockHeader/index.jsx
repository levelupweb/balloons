import React from "react";
import classes from "classnames";
import PropTypes from "prop-types";
import Margin from "@components/Margin";
import { Heading } from "@components/Typography";
import styles from "./styles";

const BlockHeader = ({ title, description, noBorder }) => (
	<Margin
		bottom
		className={classes(styles.blockHeader, { [styles.noBorder]: noBorder })}
	>
		<Heading as="h2">{title}</Heading>
		<Heading sub size={5} as="h3">
			{description}
		</Heading>
	</Margin>
);

BlockHeader.propTypes = {
	title: PropTypes.string.isRequired,
	noBorder: PropTypes.bool,
	description: PropTypes.string.isRequired
};

BlockHeader.defaultProps = {
	noBorder: false
};

export default BlockHeader;
