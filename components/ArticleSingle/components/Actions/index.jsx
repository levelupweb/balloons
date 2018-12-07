import React from "react";
import PropTypes from "prop-types";
import Margin from "@components/Margin";
import { Button, Message } from "semantic-ui-react";
import { ArticleSingleContext } from "../../context";

const Actions = ({
	isEditing,
	updateArticleStart,
	isUpdating,
	typeErrors,
	cancelEditing,
	error
}) => {
	if (isEditing) {
		return (
			<React.Fragment>
				{typeErrors && (
					<Margin bottom>
						<Message negative>
							<Message.Header>Ошибки в заполнении полей</Message.Header>
							<Message.List>
								{Object.keys(typeErrors).map((error, index) => (
									<Message.Item key={index}>
										{typeErrors[error].msg}
									</Message.Item>
								))}
							</Message.List>
						</Message>
					</Margin>
				)}
				{error && (
					<Margin bottom>
						<Message negative>
							<Message.Header>Упс. Ошибка</Message.Header>
							<p>{error}</p>
						</Message>
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
	typeErrors: PropTypes.array
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
				typeErrors={ctx.updating.typeErrors}
				cancelEditing={() => ctx.handleIsEditing(false)}
				updateArticleStart={ctx.updateArticleStart}
				isEditing={ctx.isEditing}
			/>
		)}
	</ArticleSingleContext.Consumer>
);
export default ContentWithArticleSingleContext;
