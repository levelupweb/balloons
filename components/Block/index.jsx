import React from "react";
import PropTypes from "prop-types";
import classes from "classnames";
import styles from "./styles.less";

const Block = ({ children, className, style, secondary }) => (
	<div
		className={classes(className, styles.block, {
			[styles.secondary]: secondary
		})}
		style={style}
	>
		{children}
	</div>
);

Block.propTypes = {
	children: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
		.isRequired,
	className: PropTypes.string,
	secondary: PropTypes.bool,
	style: PropTypes.object
};

Block.defaultProps = {
	className: null,
	secondary: false,
	style: {}
};

export default Block;
