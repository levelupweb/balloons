import React from "react";
import { Heading, Paragraph } from "@components/Typography";

const Header = () => (
	<React.Fragment>
		<Heading as="h3" size={4}>
			Обратный звонок
		</Heading>
		<Paragraph>
			Пожалуйста, заполните все необходимые поля и отправьте свою заявку на
			обратный звонок нашему менеджеру
		</Paragraph>
	</React.Fragment>
);

export default Header;
