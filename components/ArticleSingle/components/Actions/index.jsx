import React from "react";
import PropTypes from "prop-types";
import Margin from "@components/Margin";
import { Button, List, Segment } from "semantic-ui-react";
import { ArticleSingleContext } from "../../context";

const Actions = ({
	isEditing,
	updateArticleStart,
	isUpdating,
	typeErrors,
	cancelEditing,
	isSuccess,
	error
}) => {
	if (isEditing) {
		return (
			<React.Fragment>
				{isSuccess && (
					<Segment inverted color="green">
						Статья была успешно обновлена.
					</Segment>
				)}
				{typeErrors && (
					<Margin bottom>
						<Segment inverted color="red">
							<List>
								{Object.keys(typeErrors).map((error, index) => (
									<List.Item key={index}>{typeErrors[error].msg}</List.Item>
								))}
							</List>
						</Segment>
					</Margin>
				)}
				{error && (
					<Margin bottom>
						<Segment inverted color="red">
							<p>{error}</p>
						</Segment>
					</Margin>
				)}
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
	cancelEditing: PropTypes.func.isRequired,
	typeErrors: PropTypes.array,
	isSuccess: PropTypes.bool.isRequired
};

Actions.defaultProps = {
	error: null,
	typeErrors: null
};

const ContentWithArticleSingleContext = props => (
	<ArticleSingleContext.Consumer>
		{ctx => (
			<Actions
				{...props}
				isUpdating={ctx.updating.isHydrating}
				error={ctx.updating.error}
				isSuccess={ctx.updating.isSuccess}
				typeErrors={ctx.updating.typeErrors}
				cancelEditing={() => ctx.handleIsEditing(false)}
				updateArticleStart={ctx.updateArticleStart}
				isEditing={ctx.isEditing}
			/>
		)}
	</ArticleSingleContext.Consumer>
);
export default ContentWithArticleSingleContext;
