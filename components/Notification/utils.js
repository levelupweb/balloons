import styles from "./styles";

import {
	NOTIFICATION_VARIANT_DANGER,
	NOTIFICATION_VARIANT_INFO,
	NOTIFICATION_VARIANT_SUCCESS,
	NOTIFICATION_VARIANT_WARN
} from "./consts";

export const variantToStyle = variant => {
	if (variant === NOTIFICATION_VARIANT_DANGER) {
		return styles.danger;
	}

	if (variant === NOTIFICATION_VARIANT_INFO) {
		return styles.info;
	}

	if (variant === NOTIFICATION_VARIANT_SUCCESS) {
		return styles.success;
	}

	if (variant === NOTIFICATION_VARIANT_WARN) {
		return styles.warn;
	}
};
