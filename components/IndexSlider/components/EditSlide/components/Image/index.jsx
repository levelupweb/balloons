import React from "react";
import { SLIDE_IMAGE_URL } from "@consts/slide";
import { getStorageUrl } from "@utils";
import { EditSlideContext } from "../../context";

const Image = () => (
	<EditSlideContext.Consumer>
		{ctx => <img src={getStorageUrl(ctx.temporarySlide[SLIDE_IMAGE_URL])} />}
	</EditSlideContext.Consumer>
);

export default Image;
