import React from "react";
import Head from "next/head";
import DefaultContainer from "@containers/Default";
import CreatePortfolio from "@components/CreatePortfolio";

const CreatePortfolioPage = () => (
	<DefaultContainer>
		<Head>
			<title>Создание нового портфолио</title>
		</Head>
		<CreatePortfolio />
	</DefaultContainer>
);

CreatePortfolioPage.requireAuth = true;

export default CreatePortfolioPage;
