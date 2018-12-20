import React from "react";
import DefaultContainer from "@containers/Default";
import CreatePortfolio from "@components/CreatePortfolio";

const CreatePortfolioPage = () => (
	<DefaultContainer>
		<CreatePortfolio />
	</DefaultContainer>
);

CreatePortfolioPage.requireAuth = true;

export default CreatePortfolioPage;
