import React from "react";
import { Button, Icon } from "semantic-ui-react";
import { SaleContext } from "../../../../context";

const EditBar = () => (
	<SaleContext.Consumer>
		{ctx => (
			<div>
				<Button circular icon onClick={() => ctx.handleIsEditing(true)}>
					<Icon name="settings" />
				</Button>
				<Button circular icon onClick={() => ctx.handleIsRemoving(true)}>
					<Icon name="trash" />
				</Button>
			</div>
		)}
	</SaleContext.Consumer>
);

export default EditBar;
