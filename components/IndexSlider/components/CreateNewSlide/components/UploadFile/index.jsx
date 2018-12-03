import React from "react";
import FileUploader from "@components/FileUploader";
import { CreateNewSlideContext } from "../../context";
import { SLIDE_IMAGE_URL } from "@consts/slide";
import { BUTTON_VARIANT_DEFAULT } from "@components/Button/consts";

const UploadFile = () => (
	<CreateNewSlideContext.Consumer>
		{ctx => (
			<FileUploader
				onUrl={url =>
					ctx.handleTemporarySlide({
						[SLIDE_IMAGE_URL]: url
					})
				}
				buttonProps={{
					variant: BUTTON_VARIANT_DEFAULT,
					icon: "upload",
					basic: true
				}}
			/>
		)}
	</CreateNewSlideContext.Consumer>
);

export default UploadFile;
