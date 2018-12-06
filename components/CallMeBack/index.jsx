import React from "react";
import PropTypes from "prop-types";
import Modal from "@components/Modal";

const CallMeBack = ({ children }) => (
	<Modal trigger={children}>
		Функционал будет доступен 7.12.2018. Приносим свои извинения
	</Modal>
);

CallMeBack.propTypes = {
	children: PropTypes.element.isRequired
};

export default CallMeBack;
