import React from "react";
import PropTypes from "prop-types";
import { Heading } from "@components/Typography";
import { Icon } from "semantic-ui-react";
import styles from "./styles";

const ErrorMessage = ({ error, title }) => (
	<div className={styles.wrapper}>
		<div className={styles.icon}>
			<Icon name="compass outline" />
		</div>
		<div className={styles.error}>
			<Heading as="h1" size={2}>
				{title ? title : "Упс. Ошибка"}
			</Heading>
			<Heading sub as="p" size={5}>
				{error}
			</Heading>
		</div>
	</div>
);

ErrorMessage.propTypes = {
	error: PropTypes.string.isRequired,
	title: PropTypes.string
};

ErrorMessage.defaultProps = {
	title: null
};

export default ErrorMessage;
