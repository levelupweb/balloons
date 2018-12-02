import React from "react";
import classes from "classnames";
import PropTypes from "prop-types";
import { sizeToClassName } from "./utils";
import styles from "./styles.less";

export const Heading = ({
	as,
	size,
	children,
	style,
	thin,
	className,
	...rest
}) =>
	children &&
	React.createElement(
		as,
		{
			className: classes(
				{ [styles.thin]: thin },
				className,
				styles.heading,
				sizeToClassName(size)
			),
			style,
			...rest
		},
		children
	);

Heading.propTypes = {
	as: PropTypes.string,
	size: PropTypes.number,
	className: PropTypes.string,
	style: PropTypes.object,
	thin: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
};

Heading.defaultProps = {
	as: "h1",
	thin: false,
	children: null,
	className: null,
	style: {},
	size: 1
};

export default Heading;
