import React from "react";
import PropTypes from "prop-types";
import { Button } from "semantic-ui-react";
import { ArticleSingleContext } from "../../context";

const Actions = ({
	isEditing,
	updateArticleStart,
	isUpdating,
	cancelEditing
}) => {
	if (isEditing) {
		return (
			<React.Fragment>
				<Button color="green" onClick={updateArticleStart} loading={isUpdating}>
					Сохранить изменения
				</Button>
				<Button onClick={cancelEditing}>Отменить изменения</Button>
			</React.Fragment>
		);
	}

	return null;
};

Actions.propTypes = {
	updateArticleStart: PropTypes.func.isRequired,
	isEditing: PropTypes.bool.isRequired,
	isUpdating: PropTypes.bool.isRequired,
	error: PropTypes.string.isRequired,
	cancelEditing: PropTypes.func.isRequired
};

Actions.defaultProps = {
	error: null
};

const ContentWithArticleSingleContext = props => (
	<ArticleSingleContext.Consumer>
		{ctx => (
			<Actions
				{...props}
				isUpdating={ctx.updating.isHydrating}
				error={ctx.updating.error}
				cancelEditing={() => ctx.handleIsEditing(false)}
				updateArticleStart={ctx.updateArticleStart}
				isEditing={ctx.isEditing}
			/>
		)}
	</ArticleSingleContext.Consumer>
);
export default ContentWithArticleSingleContext;
