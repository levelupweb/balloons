import React from "react";
import PropTypes from "prop-types";
import { Menu, Icon } from "semantic-ui-react";
import { ARTICLE_UPDATED } from "@consts/article";
import { formatDate } from "@utils";
import { AuthContext } from "@providers";
import { ArticleSingleContext } from "../../context";
import styles from "./styles";

const Meta = ({ isEditing, canEdit, handleIsEditing, updated }) => (
	<Menu text fitted compact>
		<Menu.Item className={styles.item}>
			<Icon name="clock" />
			Обновление {formatDate(updated)}
		</Menu.Item>
		{canEdit && (
			<Menu.Item
				className={styles.item}
				onClick={() => handleIsEditing(!isEditing)}
			>
				<Icon name="pencil" />
				{isEditing ? "Отменить редактирование" : "Редактировать"}
			</Menu.Item>
		)}
	</Menu>
);

Meta.propTypes = {
	isEditing: PropTypes.bool.isRequired,
	handleIsEditing: PropTypes.func.isRequired,
	updated: PropTypes.bool.isRequired,
	canEdit: PropTypes.bool.isRequired
};

const MetaWithArticleSingleContext = props => (
	<ArticleSingleContext.Consumer>
		{ctx => (
			<Meta
				{...props}
				handleIsEditing={ctx.handleIsEditing}
				isEditing={ctx.isEditing}
				updated={ctx.temporaryArticle[ARTICLE_UPDATED]}
			/>
		)}
	</ArticleSingleContext.Consumer>
);

const MetaWithAuthContext = props => (
	<AuthContext.Consumer>
		{ctx => <MetaWithArticleSingleContext {...props} canEdit={!!ctx.user} />}
	</AuthContext.Consumer>
);

export default MetaWithAuthContext;
