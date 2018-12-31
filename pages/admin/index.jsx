import React from "react";
import Head from "next/head";
import DefaultContainer from "@containers/Default";
import Auth from "@components/Auth";
import Block from "@components/Block";
import styles from "./styles";

const AdminPage = () => (
	<DefaultContainer>
		<Head>
			<title>Вход в админ-панель</title>
		</Head>
		<Block className={styles.authBlock}>
			<Auth />
		</Block>
	</DefaultContainer>
);

export default AdminPage;
