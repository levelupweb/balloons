import React from "react";
import { Heading } from "@components/Typography";
import { EditSlideContext } from "../../context";

const Header = () => (
	<EditSlideContext.Consumer>
		{ctx => (
			<Heading as="h4" size={5}>
				Слайд №{ctx.index}
			</Heading>
		)}
	</EditSlideContext.Consumer>
);

export default Header;
