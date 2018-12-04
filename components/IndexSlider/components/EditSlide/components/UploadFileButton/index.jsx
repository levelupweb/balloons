import React from "react";
import FileUploader from "@components/FileUploader";
import { SLIDE_IMAGE_URL } from "@consts/slide";
import { EditSlideContext } from "../../context";

const UploadFileButton = () => (
	<EditSlideContext.Consumer>
		{ctx => (
			<FileUploader
				text="Изображение"
				buttonProps={{
					primary: false,
					circular: false
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
