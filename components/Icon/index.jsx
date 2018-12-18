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
		case "bug-report":
			return (
				<g>
					<path d="M20 8h-2.81c-.45-.78-1.07-1.45-1.82-1.96l1.63-1.63-1.41-1.41-2.17 2.17c-.46-.11-.93-.17-1.42-.17-.49 0-.96.06-1.41.17l-2.18-2.17-1.41 1.41 1.62 1.63c-.74.51-1.36 1.18-1.81 1.96h-2.81v2h2.09c-.05.33-.09.66-.09 1v1h-2v2h2v1c0 .34.04.67.09 1h-2.09v2h2.81c1.04 1.79 2.97 3 5.19 3s4.15-1.21 5.19-3h2.81v-2h-2.09c.05-.33.09-.66.09-1v-1h2v-2h-2v-1c0-.34-.04-.67-.09-1h2.09v-2zm-6 8h-4v-2h4v2zm0-4h-4v-2h4v2z" />
				</g>
			);
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
