import React from "react";
import PropTypes from "prop-types";
import elementResizeEvent, { unbind } from "element-resize-event";
import styles from "./styles";

class ScalableSVG extends React.Component {
	state = {
		wrapper: null,
		scale: 1
	};

	componentWillUnmount = () => {
		const { wrapper } = this.state;

		if (wrapper) {
			unbind(wrapper);
		}
	};

	handleRef = wrapper =>
		this.setState(
			{
				wrapper
			},
			this.bindResize
		);
	bindResize = () => {
		const { wrapper } = this.state;

		elementResizeEvent(wrapper, () => {
			this.forceUpdate();
		});
	};

	getStyles = () => {
		const { fill, url } = this.props;
		const { wrapper } = this.state;

		return {
			maskImage: `url("${url}")`,
			WebkitMaskImage: `url("${url}")`,
			backgroundColor: fill,
			width: wrapper.offsetWidth,
			height: wrapper.offsetHeight
		};
	};

	render = () => (
		<div
			ref={this.handleRef}
			className={styles.wrapper}
			style={{ width: "100%", height: "100%" }}
		>
			{this.state.wrapper && (
				<div className={styles.svg} style={this.getStyles()} />
			)}
		</div>
	);
}

ScalableSVG.propTypes = {
	fill: PropTypes.string,
	url: PropTypes.string.isRequired
};

ScalableSVG.defaultProps = {
	fill: "black"
};

export default ScalableSVG;
