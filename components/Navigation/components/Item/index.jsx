import React from "react";
import PropTypes from "prop-types";
import Multi from "./components/Multi";
import Simple from "./components/Simple";

const Item = ({ item, vertical, rect }) => {
	if (item.elements) {
		return <Multi rect={rect} vertical={vertical} item={item} />;
	}

	return <Simple vertical={vertical} item={item} />;
};

Item.propTypes = {
	item: PropTypes.object.isRequired,
	rect: PropTypes.object,
	vertical: PropTypes.bool
};

Item.defaultProps = {
	rect: null,
	vertical: false
};

export default Item;
