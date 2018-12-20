import React from "react";
import PropTypes from "prop-types";
import { Menu, Icon } from "semantic-ui-react";
import { NEWS_UPDATED } from "@consts/news";
import { formatDate } from "@utils";
import { AuthContext } from "@providers";
import { NewsSingleContext } from "../../context";
import styles from "./styles";

const Meta = ({ isEditing, canEdit, handleIsEditing, updated }) => (
	<Menu className={styles.menu} text fitted compact>
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

const MetaWithNewsSingleContext = props => (
	<NewsSingleContext.Consumer>
		{ctx => (
			<Meta
				{...props}
				handleIsEditing={ctx.handleIsEditing}
				updated={ctx.getField(NEWS_UPDATED)}
				isEditing={ctx.isEditing}
			/>
		)}
	</NewsSingleContext.Consumer>
);

const MetaWithAuthContext = props => (
	<AuthContext.Consumer>
		{ctx => <MetaWithNewsSingleContext {...props} canEdit={!!ctx.user} />}
	</AuthContext.Consumer>
);

export default MetaWithAuthContext;
