import React from "react";
import PropTypes from "prop-types";
import classes from "classnames";
import styles from "./styles";
import { BUTTON_VARIANT_DEFAULT, BUTTON_SIZE_DEFAULT } from "./consts";
import { variantToStyle, sizeToStyle } from "./utils";

const Button = ({ onClick, loading, children, variant, size }) => (
	<button
		onClick={onClick}
		className={classes(
			styles.button,
			variantToStyle(variant),
			sizeToStyle(size),
			{ [styles.loading]: loading }
		)}
	>
		{children}
	</button>
);

Button.propTypes = {
	children: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
		.isRequired,
	variant: PropTypes.string,
	size: PropTypes.string,
	loading: PropTypes.bool,
	onClick: PropTypes.func
};

Button.defaultProps = {
	variant: BUTTON_VARIANT_DEFAULT,
	onClick: null,
	size: BUTTON_SIZE_DEFAULT,
	loading: false
};

export default Button;
