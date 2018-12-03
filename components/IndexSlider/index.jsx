import React from "react";
import PropTypes from "prop-types";
import OneSlideSlider from "@components/OneSlideSlider";

class IndexSlider extends React.Component {
	state = {};

	render = () => {
		const { isEditing } = this.props;

		return (
			<OneSlideSlider>
				<div>1</div>
				<div>2</div>
			</OneSlideSlider>
		);
	};
}

IndexSlider.propTypes = {
	isEditing: PropTypes.bool
};

IndexSlider.defaultProps = {
	isEditing: false
};

export default IndexSlider;
