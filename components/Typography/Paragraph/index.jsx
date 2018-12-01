import React from "react";
import classes from "classnames";
import PropTypes from "prop-types";
import styles from "./styles";

export const Paragraph = ({ children, lead, className, style }) => (
	<p
		style={style}
		className={classes(className, { [styles.lead]: lead }, styles.p)}
	>
		{children}
	</p>
);

Paragraph.propTypes = {
	children: PropTypes.string.isRequired,
	style: PropTypes.object,
	className: PropTypes.string,
	lead: PropTypes.bool
};

Paragraph.defaultProps = {
	lead: false,
	className: null
};

export default Paragraph;
