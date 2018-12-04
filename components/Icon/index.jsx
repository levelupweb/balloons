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
		case "invert-colors":
			return (
				<g>
					<path d="M17.66 7.93l-5.66-5.66-5.66 5.66c-3.12 3.12-3.12 8.19 0 11.31 1.56 1.56 3.61 2.34 5.66 2.34 2.05 0 4.1-.78 5.66-2.34 3.12-3.12 3.12-8.19 0-11.31zm-5.66 11.66c-1.6 0-3.11-.62-4.24-1.76-1.14-1.14-1.76-2.64-1.76-4.24s.62-3.11 1.76-4.24l4.24-4.25v14.49z" />
				</g>
			);
		case "add":
			return (
				<g>
					<path d="M19 13h-6v6h-2v-6h-6v-2h6v-6h2v6h6v2z" />
				</g>
			);
		case "check":
			return (
				<g>
					<path d="M9 16.17l-4.17-4.17-1.42 1.41 5.59 5.59 12-12-1.41-1.41z" />
				</g>
			);
		case "upload":
			return (
				<g>
					<path d="M19.35 10.04c-.68-3.45-3.71-6.04-7.35-6.04-2.89 0-5.4 1.64-6.65 4.04-3.01.32-5.35 2.87-5.35 5.96 0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zm-5.35 2.96v4h-4v-4h-3l5-5 5 5h-3z" />
				</g>
			);
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
