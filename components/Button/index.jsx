import React from "react";
import PropTypes from "prop-types";
import classes from "classnames";
import Icon from "@components/Icon";
import styles from "./styles";
import { BUTTON_VARIANT_DEFAULT, BUTTON_SIZE_DEFAULT } from "./consts";
import { variantToStyle, sizeToStyle } from "./utils";

const Button = ({
	onClick,
	loading,
	children,
	variant,
	size,
	basic,
	icon,
	withShadow
}) => (
	<button
		onClick={!loading ? onClick : null}
		className={classes(
			styles.button,
			variantToStyle(variant),
			sizeToStyle(size),
			{ [styles.loading]: loading },
			{ [styles.withShadow]: withShadow },
			{ [styles.basic]: basic }
		)}
	>
		{children}
		{icon && <Icon className={styles.icon} icon={icon} size={17} />}
	</button>
);

Button.propTypes = {
	children: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
		.isRequired,
	variant: PropTypes.string,
	size: PropTypes.string,
	loading: PropTypes.bool,
	basic: PropTypes.bool,
	icon: PropTypes.string,
	onClick: PropTypes.func,
	withShadow: PropTypes.bool
};

Button.defaultProps = {
	basic: false,
	variant: BUTTON_VARIANT_DEFAULT,
	onClick: null,
	size: BUTTON_SIZE_DEFAULT,
	loading: false,
	icon: null,
	withShadow: false
};

export default Button;
