import React from "react";
import DefaultContainer from "@containers/Default";
import CreateNews from "@components/CreateNews";

const CreateNewsPage = () => (
	<DefaultContainer>
		<CreateNews />
	</DefaultContainer>
);

CreateNewsPage.requireAuth = true;

export default CreateNewsPage;
