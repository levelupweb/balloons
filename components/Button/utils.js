import {
	BUTTON_VARIANT_DEFAULT,
	BUTTON_VARIANT_PRIMARY,
	BUTTON_SIZE_SMALL,
	BUTTON_SIZE_DEFAULT,
	BUTTON_SIZE_BIG
} from "./consts";

import styles from "./styles";

export const variantToStyle = variant => {
	if (variant === BUTTON_VARIANT_DEFAULT) {
		return styles.default;
	}

	if (variant === BUTTON_VARIANT_PRIMARY) {
		return styles.primary;
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
