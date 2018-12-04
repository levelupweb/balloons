import React from "react";
import PropTypes from "prop-types";
import { Dropdown, Label } from "semantic-ui-react";
import { isFunction } from "@utils";

class DropdownWrapper extends React.Component {
	handleChange = (event, data) => {
		const { onChange } = this.props;

		if (isFunction(onChange)) {
			onChange(event, data.value, data);
		}
	};

	render = () => (
		<div>
			<Dropdown
				{...this.props}
				noResultsMessage="Ничего не найдено.."
				onChange={this.handleChange}
				size="large"
			/>
			{this.props.error && (
				<Label color="red" pointing>
					{this.props.error}
				</Label>
			)}
		</div>
	);
}

DropdownWrapper.propTypes = {
	onChange: PropTypes.func,
	error: PropTypes.string
};

DropdownWrapper.defaultProps = {
	onChange: null,
	error: null
};

export default DropdownWrapper;
