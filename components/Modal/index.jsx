import React from "react";
import PropTypes from "prop-types";
import { isBrowser } from "@utils";
import ReactModal from "react-modal";
import { isFunction } from "util";
import styles from "./styles";

class Modal extends React.Component {
	state = {
		open: false
	};

	constructor(props) {
		super(props);

		if (isBrowser()) {
			ReactModal.setAppElement(document.getElementById("__next"));
		}

		this.state = {
			open: false
		};
	}

	isOpen = () => {
		const { open } = this.props;

		if (open !== null) {
			return open;
		}

		return this.state.open;
	};

	handleOpen = open =>
		this.setState({
			open
		});

	getCloseHandler = () => {
		const { onClose } = this.props;

		if (isFunction(onClose)) {
			return onClose;
		}

		return () =>
			this.setState({
				open: false
			});
	};

	getOpenHandler = () => {
		const { onOpen } = this.props;

		if (isFunction(onOpen)) {
			return onOpen;
		}

		return () =>
			this.setState({
				open: true
			});
	};

	render = () => {
		const { trigger, title, description, children } = this.props;

		const open = this.isOpen();

		return (
			<React.Fragment>
				{trigger &&
					React.cloneElement(trigger, {
						onClick: () => this.handleOpen(true)
					})}
				<ReactModal
					isOpen={open}
					onAfterOpen={this.getOpenHandler()}
					contentLabel={title}
					onRequestClose={this.getCloseHandler()}
					aria={{
						labelledby: title,
						describedby: description
					}}
				>
					{children}
				</ReactModal>
			</React.Fragment>
		);
	};
}

Modal.propTypes = {
	onClose: PropTypes.func,
	open: PropTypes.bool,
	onOpen: PropTypes.func,
	title: PropTypes.string,
	description: PropTypes.string,
	trigger: PropTypes.element,
	children: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element,
		PropTypes.arrayOf(PropTypes.string),
		PropTypes.arrayOf(PropTypes.element)
	]).isRequired
};

Modal.defaultProps = {
	onClose: null,
	open: null,
	onOpen: null,
	title: null,
	description: null,
	trigger: null
};

export default Modal;
