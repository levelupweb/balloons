import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { Menu, Checkbox, Container, Icon } from "semantic-ui-react";
import { EditContext, AuthContext } from "@providers";
import styles from "./styles";

const EditorMenu = ({ toggleEditing, isEditing, logout }) => (
	<div className={styles.menu}>
		<Container>
			<Menu text className={styles.items} fluid compact>
				<Menu.Item className={styles.item}>
					<Checkbox
						toggle
						label="Режим редактирования"
						checked={isEditing}
						onChange={(_, { checked }) =>
							checked !== isEditing && toggleEditing()
						}
					/>
				</Menu.Item>
				<Link href="/admin/articles">
					<Menu.Item as="a" className={styles.item}>
						<Icon name="pencil" />
						Редактировать статьи
					</Menu.Item>
				</Link>
				<Link href="/article/create">
					<Menu.Item as="a" className={styles.item}>
						<Icon name="add" />
						Создать статью
					</Menu.Item>
				</Link>
				<Menu.Menu position="right">
					<Menu.Item onClick={logout} className={styles.item}>
						<Icon name="sign out" />
						Выйти
					</Menu.Item>
				</Menu.Menu>
			</Menu>
		</Container>
	</div>
);

EditorMenu.propTypes = {
	toggleEditing: PropTypes.func.isRequired,
	isEditing: PropTypes.bool.isRequired,
	logout: PropTypes.func.isRequired
};

const EditorMenuWithEditContext = props => (
	<EditContext.Consumer>
		{ctx => (
			<EditorMenu
				{...props}
				toggleEditing={ctx.toggleEditing}
				isEditing={ctx.isEditing}
			/>
		)}
	</EditContext.Consumer>
);

const EditorMenuWithAuthContext = props => (
	<AuthContext.Consumer>
		{ctx => <EditorMenuWithEditContext {...props} logout={ctx.logout} />}
	</AuthContext.Consumer>
);

export default EditorMenuWithAuthContext;
