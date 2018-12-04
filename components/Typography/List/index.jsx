import React from "react";
import PropTypes from "prop-types";
import classes from "classnames";
import styles from "./styles";

export const List = ({ className, style, children }) => (
	<ul className={classes(styles.list, className)} style={style}>
		{children.map((item, index) => (
			<li key={index}>{item}</li>
		))}
	</ul>
);

List.propTypes = {
	className: PropTypes.string,
	style: PropTypes.object,
	children: PropTypes.arrayOf(PropTypes.string)
};

List.defaultProps = {
	className: null,
	style: {}
};

export default List;
