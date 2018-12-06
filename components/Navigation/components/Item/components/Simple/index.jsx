import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import classes from "classnames";
import Atomic from "../Atomic";
import styles from "./styles";

const Simple = ({ vertical, item }) => (
	<Link shallow href={`/article/${item.slug}`}>
		<a>
			<Atomic className={classes(styles.item, { [styles.vertical]: vertical })}>
				<span className={styles.wrapper}>
					<span className={styles.title}>{item.title}</span>
				</span>
			</Atomic>
		</a>
	</Link>
);

Simple.propTypes = {
	vertical: PropTypes.bool,
	item: PropTypes.any
};

Simple.defaultProps = {
	vertical: false
};

export default Simple;
