import React from "react";
import PropTypes from "prop-types";
import FileUploader from "@components/FileUploader";
import styles from "./styles";

const Uploader = ({ onUpload, index }) => (
	<div className={styles.wrapper}>
		<FileUploader
			accept="image/svg+xml,image/png"
			text={`Загрузить ${index} лого`}
			onUrl={onUpload}
			buttonProps={{
				primary: false,
				inverted: true,
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
