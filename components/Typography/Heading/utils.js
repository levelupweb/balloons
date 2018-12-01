import styles from "./styles";

export const sizeToClassName = size => {
	if (size === 1) {
		return styles.h1;
	}
	if (size === 2) {
		return styles.h2;
	}
	if (size === 3) {
		return styles.h3;
	}
	if (size === 4) {
		return styles.h4;
	}
	if (size === 5) {
		return styles.h5;
	}
	if (size === 6) {
		return styles.h6;
	}

	return styles.h1;
};
