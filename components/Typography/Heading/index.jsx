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
	sub,
	primary,
	...rest
}) =>
	children &&
	React.createElement(
		as,
		{
			className: classes(
				{ [styles.thin]: thin },
				{ [styles.primary]: primary },
				{ [styles.sub]: sub },
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
	primary: PropTypes.bool,
	sub: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
};

Heading.defaultProps = {
	as: "h1",
	primary: false,
	sub: false,
	thin: false,
	children: null,
	className: null,
	style: {},
	size: 1
};

export default Heading;
