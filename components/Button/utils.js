import {
	BUTTON_VARIANT_DEFAULT,
	BUTTON_VARIANT_PRIMARY,
	BUTTON_SIZE_SMALL,
	BUTTON_SIZE_DEFAULT,
	BUTTON_SIZE_BIG,
	BUTTON_VARIANT_DANGER,
	BUTTON_VARIANT_SUCCESS
} from "./consts";

import styles from "./styles";

export const variantToStyle = variant => {
	if (variant === BUTTON_VARIANT_DEFAULT) {
		return styles.default;
	}

	if (variant === BUTTON_VARIANT_PRIMARY) {
		return styles.primary;
	}

	if (variant === BUTTON_VARIANT_SUCCESS) {
		return styles.success;
	}
	if (variant === BUTTON_VARIANT_DANGER) {
		return styles.danger;
	}

	return styles.default;
};

export const sizeToStyle = size => {
	if (size === BUTTON_SIZE_SMALL) {
		return styles.small;
	}

	if (size === BUTTON_SIZE_DEFAULT) {
		return styles.defaultSize;
	}

	if (size === BUTTON_SIZE_BIG) {
		return styles.big;
	}
};
