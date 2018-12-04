import React from "react";
import PropTypes from "prop-types";
import FileUploader from "@components/FileUploader";
import styles from "./styles";

const Uploader = ({ onUpload, index }) => (
	<div className={styles.wrapper}>
		<FileUploader
			accept="image/svg+xml"
			text={`Загрузить ${index} лого`}
			onUrl={onUpload}
			buttonProps={{
				color: "black",
				size: "medium"
			}}
		/>
	</div>
);

Uploader.propTypes = {
	onUpload: PropTypes.func.isRequired,
	index: PropTypes.number.isRequired
};

export default Uploader;
