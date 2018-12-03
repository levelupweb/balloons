import React from "react";
import PropTypes from "prop-types";
import { AuthContext } from "@providers";

export const EditContext = React.createContext({
	isEditing: false
});

class EditProviderClass extends React.Component {
	state = {
		isEditing: false
	};

	toggleEditing = () => {
		const { isEditing } = this.state;
		const { canEdit } = this.props;

		if (!canEdit) return;

		this.setState({
			isEditing: !isEditing
		});
	};

	render = () => (
		<EditContext.Provider
			value={{
				isEditing: this.state.isEditing,
				toggleEditing: this.toggleEditing
			}}
		>
			{this.props.children}
		</EditContext.Provider>
	);
}

EditProviderClass.propTypes = {
	children: PropTypes.element.isRequired,
	canEdit: PropTypes.bool.isRequired
};

const EditProviderClassWithAuthContext = props => (
	<AuthContext.Consumer>
		{ctx => <EditProviderClass {...props} canEdit={!!ctx.user} />}
	</AuthContext.Consumer>
);

export const EditProvider = EditProviderClassWithAuthContext;
