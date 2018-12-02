import React from "react";
import classes from "classnames";
import PropTypes from "prop-types";
import styles from "./styles";

const Container = ({ children, className }) => (
	<div className={classes(styles.container, className)}>
		<div className={styles.inner}>{children}</div>
	</div>
);

Container.propTypes = {
	children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	className: PropTypes.string
};

Container.defaultProps = {
	className: null
};

export default Container;
