import React from "react";
import classes from "classnames";
import PropTypes from "prop-types";
import styles from "./styles";

const Atomic = ({ children, vertical, className, isExpanded, ...rest }) => (
	<li
		{...rest}
		className={classes(
			{ [styles.vertical]: vertical },
			{ [styles.expanded]: isExpanded },
			className,
			styles.atomic
		)}
	>
		{children}
	</li>
);

Atomic.propTypes = {
	children: PropTypes.any,
	className: PropTypes.any,
	isExpanded: PropTypes.bool,
	vertical: PropTypes.bool
};

export default Atomic;
