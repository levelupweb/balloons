import React from "react";
import PropTypes from "prop-types";
import Margin from "@components/Margin";
import { Heading } from "@components/Typography";

const Field = ({ title, description, children }) => (
	<React.Fragment>
		<Heading as="h3" size={5}>
			{title}
		</Heading>
		<Heading as="h5" size={6} sub>
			{description}
		</Heading>
		<Margin half top>
			{children}
		</Margin>
	</React.Fragment>
);

Field.propTypes = {
	title: PropTypes.string.isRequired,
	description: PropTypes.string,
	children: PropTypes.element.isRequired
};

Field.defaultProps = { description: null };

export default Field;
