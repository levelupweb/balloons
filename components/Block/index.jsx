import React from "react";
import PropTypes from "prop-types";
import classes from "classnames";
import styles from "./styles.less";

const Block = ({ children, className, style }) => (
	<div className={classes(className, styles.block)} style={style}>
		{children}
	</div>
);

Block.propTypes = {
	children: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
		.isRequired,
	className: PropTypes.string,
	style: PropTypes.object
};

Block.defaultProps = {
	className: null,
	style: {}
};

export default Block;
