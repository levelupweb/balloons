import React from "react";
import DefaultContainer from "@containers/Default";
import Head from "next/head";
import CreateNews from "@components/CreateNews";

const CreateNewsPage = () => (
	<DefaultContainer>
		<Head>
			<title>Создание новости - Золотая стрекоза</title>
		</Head>
		<CreateNews />
	</DefaultContainer>
);

CreateNewsPage.requireAuth = true;

export default CreateNewsPage;
