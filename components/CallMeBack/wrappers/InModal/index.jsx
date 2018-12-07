import React from "react";
import PropTypes from "prop-types";
import { Modal } from "semantic-ui-react";

class CallMeBackInModal extends React.Component {
	state = {
		open: false
	};

	handleOpen = () => this.setState({ open: true });

	handleClose = () => this.setState({ open: false });

	handleIsOpen = isOpen => this.setState({ open: isOpen });

	render = () => {
		const { open } = this.state;
		const { trigger, children, ...rest } = this.props;

		return (
			<Modal
				size="tiny"
				open={open}
				trigger={trigger}
				onOpen={this.handleOpen}
				onClose={this.handleClose}
			>
				{children({
					handleIsOpen: this.handleIsOpen,
					...rest
				})}
			</Modal>
		);
	};
}

CallMeBackInModal.propTypes = {
	trigger: PropTypes.element.isRequired,
	children: PropTypes.func.isRequired
};

export default CallMeBackInModal;
