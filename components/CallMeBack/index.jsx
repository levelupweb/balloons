import React from "react";
import PropTypes from "prop-types";
import Modal from "@components/Modal";

const CallMeBack = ({ children }) => (
	<Modal trigger={children}>Hey, call me</Modal>
);

CallMeBack.propTypes = {
	children: PropTypes.element.isRequired
};

export default CallMeBack;
