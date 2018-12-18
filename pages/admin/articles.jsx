import React from "react";
import DefaultContainer from "@containers/Default";
import Articles from "@components/Articles";

const ArticlesPage = () => (
	<DefaultContainer>
		<Articles />
	</DefaultContainer>
);

ArticlesPage.requireAuth = true;

export default ArticlesPage;
