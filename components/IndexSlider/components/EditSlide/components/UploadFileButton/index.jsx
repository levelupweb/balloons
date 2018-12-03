import React from "react";
import FileUploader from "@components/FileUploader";
import { SLIDE_IMAGE_URL } from "@consts/slide";
import { BUTTON_VARIANT_DEFAULT } from "@components/Button/consts";
import { EditSlideContext } from "../../context";

const UploadFileButton = () => (
	<EditSlideContext.Consumer>
		{ctx => (
			<FileUploader
				buttonProps={{
					basic: true,
					children: "Новое изображение",
					variant: BUTTON_VARIANT_DEFAULT,
					icon: "upload"
				}}
				onUrl={url =>
					ctx.handleTemporarySlide({
						[SLIDE_IMAGE_URL]: url
					})
				}
			/>
		)}
	</EditSlideContext.Consumer>
);

export default UploadFileButton;
