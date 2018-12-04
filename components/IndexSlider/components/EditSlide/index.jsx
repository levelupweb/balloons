import React from "react";
import PropTypes from "prop-types";
import Margin from "@components/Margin";
import { Form, Button } from "semantic-ui-react";
import styles from "./styles";
import { EditSlideContext, EditSlideProvider } from "./context";
import Image from "./components/Image";
import Field from "@components/Field";
import Title from "./components/Title";
import Description from "./components/Description";
import Error from "./components/Error";
import UploadFileButton from "./components/UploadFileButton";
import SaveButton from "./components/SaveButton";
import RemoveButton from "./components/RemoveButton";

const EditSlide = ({ hasError }) => (
	<div className={styles.slide}>
		<Form>
			<div className={styles.main}>
				<div className={styles.image}>
					<Margin right>
						<Field title="Изображение">
							<Image />
						</Field>
					</Margin>
				</div>
				<div className={styles.content}>
					<Field title="Заголовок">
						<Title />
					</Field>
					<Margin top>
						<Field title="Подзаголовок">
							<Description />
						</Field>
					</Margin>
					<Margin top>
						<div className={styles.actions}>
							<Button.Group widths="3">
								<UploadFileButton />
								<SaveButton />
								<RemoveButton />
							</Button.Group>
						</div>
					</Margin>
				</div>
			</div>
			{hasError && (
				<Margin top>
					<Error />
				</Margin>
			)}
		</Form>
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
