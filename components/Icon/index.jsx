import React from "react";
import PropTypes from "prop-types";

class Icon extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.renderIcon = this.renderIcon.bind(this);
	}

	handleClick() {
		const { onClick } = this.props;

		if (onClick && typeof onClick === "function") {
			onClick();
		}
	}

	renderIcon() {
		const { icon } = this.props;

		switch (icon) {
		case "close":
			return (
				<g>
					<path d="M19 6.41l-1.41-1.41-5.59 5.59-5.59-5.59-1.41 1.41 5.59 5.59-5.59 5.59 1.41 1.41 5.59-5.59 5.59 5.59 1.41-1.41-5.59-5.59z" />
				</g>
			);
		case "keyboard-arrow-down":
			return (
				<g>
					<path d="M7.41 7.84l4.59 4.58 4.59-4.58 1.41 1.41-6 6-6-6z" />
				</g>
			);
		case "chevron-right":
			return (
				<g>
					<path d="M10 6l-1.41 1.41 4.58 4.59-4.58 4.59 1.41 1.41 6-6z" />
				</g>
			);
		case "chevron-left":
			return (
				<g>
					<path d="M15.41 7.41l-1.41-1.41-6 6 6 6 1.41-1.41-4.58-4.59z" />
				</g>
			);

		default:
			return null;
		}
	}

	render() {
		const { size, style, className } = this.props;

		const defaultStyles = {
			fill: "currentcolor",
			verticalAlign: "middle",
			width: size,
			height: size
		};

		return (
			<span aria-hidden="true" onClick={this.handleClick} className={className}>
				<svg
					viewBox="0 0 24 24"
					style={{
						...defaultStyles,
						...style
					}}
				>
					{this.renderIcon()}
				</svg>
			</span>
		);
	}
}

Icon.defaultProps = {
	size: 24,
	className: null,
	onClick: null
};

Icon.propTypes = {
	className: PropTypes.string,
	icon: PropTypes.string.isRequired,
	onClick: PropTypes.func,
	size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	style: PropTypes.object
};

export default Icon;
