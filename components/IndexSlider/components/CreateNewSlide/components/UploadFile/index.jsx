import React from "react";
import FileUploader from "@components/FileUploader";
import { CreateNewSlideContext } from "../../context";
import { SLIDE_IMAGE_URL } from "@consts/slide";

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
					circular: false,
					primary: false
				}}
			/>
		)}
	</CreateNewSlideContext.Consumer>
);

export default UploadFile;
