import React from "react";
import PropTypes from "prop-types";
import classes from "classnames";
import styles from "./styles";

class Dropdown extends React.Component {
	constructor(props) {
		super(props);

		this.dropdown = React.createRef();
		this.trigger = React.createRef();

		this.state = {
			open: this.props.alwaysOpen || false,
			childrenWidth: 0
		};
	}

	componentDidMount = () => {
		const { alwaysOpen } = this.props;

		if (alwaysOpen) {
			return;
		}

		window.addEventListener("click", this.handleBrowserClick);
	};

	componentWillUnmount = () => {
		const { alwaysOpen } = this.props;

		if (alwaysOpen) {
			return;
		}

		window.removeEventListener("click", this.handleBrowserClick);
	};

	handleBrowserClick = e => {
		if (!this.dropdown.current.contains(e.target)) {
			this.handleOpen(false);
		}
	};

	getStyles = () => {
		const { childrenWidth } = this.state;
		const { left } = this.props;

		if (left) {
			return {};
		}

		return {
			marginLeft: -childrenWidth / 2
		};
	};

	handleChildren = child =>
		child &&
		this.setState({
			childrenWidth: child.clientWidth
		});

	getToggler = () => {
		const { alwaysOpen } = this.props;
		const { open } = this.state;

		if (alwaysOpen) {
			return null;
		}

		return () => this.handleOpen(!open);
	};

	handleOpen = open =>
		this.setState({
			open
		});

	render = () => {
		const { trigger, children, className, triggerClassName, left } = this.props;
		const { open } = this.state;

		return (
			<div
				ref={this.dropdown}
				className={classes(styles.dropdown, className, { [styles.left]: left })}
			>
				<div
					ref={this.trigger}
					className={classes(styles.trigger, triggerClassName)}
					onClick={this.getToggler()}
				>
					{trigger}
				</div>
				{open && (
					<div
						ref={this.handleChildren}
						style={this.getStyles()}
						className={styles.dropdownWrapper}
					>
						{children}
					</div>
				)}
			</div>
		);
	};
}

Dropdown.propTypes = {
	children: PropTypes.any.isRequired,
	alwaysOpen: PropTypes.bool,
	left: PropTypes.bool,
	triggerClassName: PropTypes.string,
	trigger: PropTypes.element.isRequired,
	className: PropTypes.string
};

Dropdown.defaultProps = {
	alwaysOpen: false,
	left: false,
	triggerClassName: null,
	className: null
};

export default Dropdown;
