import React from "react";
import PropTypes from "prop-types";
import styles from "./styles";

const Container = ({ children }) => (
	<div className={styles.container}>
		<div className={styles.inner}>{children}</div>
	</div>
);

Container.propTypes = {
	children: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
};

export default Container;
