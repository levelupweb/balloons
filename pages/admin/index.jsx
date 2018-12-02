import React from "react";
import DefaultContainer from "@containers/Default";
import Auth from "@components/Auth";
import Block from "@components/Block";
import styles from "./styles";

const AdminPage = () => (
	<DefaultContainer>
		<Block className={styles.authBlock}>
			<Auth />
		</Block>
	</DefaultContainer>
);

export default AdminPage;
