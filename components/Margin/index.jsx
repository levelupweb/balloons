import React from "react";
import PropTypes from "prop-types";
import classes from "classnames";
import styles from "./styles";

const Margin = ({ children, top, left, right, bottom, double, half }) => (
	<div
		className={classes(
			styles.margin,
			{ [styles.double]: double },
			{ [styles.top]: top },
			{ [styles.left]: left },
			{ [styles.right]: right },
			{ [styles.bottom]: bottom },
			{ [styles.half]: half }
		)}
	>
		{children}
	</div>
);

Margin.propTypes = {
	children: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
		.isRequired,
	top: PropTypes.bool,
	left: PropTypes.bool,
	right: PropTypes.bool,
	half: PropTypes.bool,
	bottom: PropTypes.bool,
	double: PropTypes.bool
};

Margin.defaultProps = {
	top: false,
	left: false,
	half: false,
	double: false,
	right: false,
	bottom: false
};

export default Margin;
