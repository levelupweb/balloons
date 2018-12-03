import React from "react";
import PropTypes from "prop-types";
import Button from "@components/Button";
import { BUTTON_VARIANT_PRIMARY } from "@components/Button/consts";
import { EditContext } from "@providers";

const EditButton = ({ toggleEditing, isEditing }) => (
	<Button variant={BUTTON_VARIANT_PRIMARY} onClick={toggleEditing}>
		{isEditing ? "Выйти из редактирования" : "Войти в редактор"}
	</Button>
);

EditButton.propTypes = {
	toggleEditing: PropTypes.func.isRequired,
	isEditing: PropTypes.bool.isRequired
};

const EditButtonWithEditContext = props => (
	<EditContext.Consumer>
		{ctx => (
			<EditButton
				{...props}
				toggleEditing={ctx.toggleEditing}
				isEditing={ctx.isEditing}
			/>
		)}
	</EditContext.Consumer>
);

export default EditButtonWithEditContext;
