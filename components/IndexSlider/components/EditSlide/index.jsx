import React from "react";
import PropTypes from "prop-types";
import Margin from "@components/Margin";
import styles from "./styles";
import { EditSlideContext, EditSlideProvider } from "./context";
import Header from "./components/Header";
import Image from "./components/Image";
import Title from "./components/Title";
import Description from "./components/Description";
import Error from "./components/Error";
import UploadFileButton from "./components/UploadFileButton";
import SaveButton from "./components/SaveButton";
import RemoveButton from "./components/RemoveButton";

const EditSlide = ({ hasError }) => (
	<div className={styles.slide}>
		<Header />
		<div className={styles.main}>
			<div className={styles.image}>
				<Margin top right>
					<Image />
				</Margin>
			</div>
			<div className={styles.content}>
				<Title />
				<Margin top>
					<Description />
				</Margin>
			</div>
		</div>
		{hasError && (
			<Margin top>
				<Error />
			</Margin>
		)}
		<Margin top>
			<div className={styles.actions}>
				<UploadFileButton />
				<SaveButton />
				<RemoveButton />
			</div>
		</Margin>
	</div>
);

EditSlide.propTypes = {
	hasError: PropTypes.bool.isRequired
};

const EditSlideWithProvider = props => (
	<EditSlideProvider slideId={props.slideId} index={props.index}>
		<EditSlideContext.Consumer>
			{ctx => <EditSlide {...props} hasError={!!ctx.error} />}
		</EditSlideContext.Consumer>
	</EditSlideProvider>
);

export default EditSlideWithProvider;
