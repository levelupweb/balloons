import React from "react";
import PropTypes from "prop-types";
import classes from "classnames";
import Item from "../Item";
import styles from "./styles";

const Items = ({ vertical, items, rect }) => (
	<ul className={classes(styles.menu, { [styles.vertical]: vertical })}>
		{Object.keys(items).map((item, index) => (
			<Item vertical={vertical} rect={rect} item={items[item]} key={index} />
		))}
	</ul>
);

Items.propTypes = {
	vertical: PropTypes.bool,
	items: PropTypes.object,
	rect: PropTypes.object
};

Items.defaultProps = {
	vertical: false,
	rect: null
};

export default Items;
