import React from "react";
import Head from "next/head";
import DefaultContainer from "@containers/Default";
import Articles from "@components/Articles";

const ArticlesPage = () => (
	<DefaultContainer>
		<Head>
			<title>Управление статьями</title>
		</Head>
		<Articles />
	</DefaultContainer>
);

ArticlesPage.requireAuth = true;

export default ArticlesPage;
