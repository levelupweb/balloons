import React from "react";
import PropTypes from "prop-types";
import { withAsyncSetState } from "@utils";
import { Form, Button } from "semantic-ui-react";
import Margin from "@components/Margin";
import Field from "@components/Field";
import StartButton from "./components/StartButton";
import Image from "./components/Image";
import Title from "./components/Title";
import Error from "./components/Error";
import UploadFile from "./components/UploadFile";
import Submit from "./components/Submit";
import Description from "./components/Description";
import { CreateNewSlideContext, CreateNewSlideProvider } from "./context";
import styles from "./styles";

const CreateNewSlide = ({ isCreating, hasError }) => {
	if (!isCreating) {
		return (
			<div className={styles.centered}>
				<StartButton />
			</div>
		);
	}

	return (
		<Form className={styles.form}>
			<div className={styles.main}>
				<Margin className={styles.image} right>
					<Image />
				</Margin>
				<div className={styles.content}>
					<Field title="Заголовок">
						<Title />
					</Field>
					<Margin top>
						<Field title="Подзаголовок">
							<Description />
						</Field>
					</Margin>
					<Margin className={styles.actions} top>
						<Button.Group>
							<UploadFile />
							<Submit />
						</Button.Group>
					</Margin>
				</div>
			</div>
			{hasError && (
				<Margin top>
					<Error />
				</Margin>
			)}
		</Form>
	);
};

CreateNewSlide.propTypes = {
	isCreating: PropTypes.bool.isRequired,
	hasError: PropTypes.bool.isRequired
};

const CreateNewSlideWithAsyncSetState = withAsyncSetState(CreateNewSlide);

const CreateNewSlideWithCreateNewSlideContext = props => (
	<CreateNewSlideProvider>
		<CreateNewSlideContext.Consumer>
			{ctx => (
				<CreateNewSlideWithAsyncSetState
					{...props}
					hasError={!!ctx.error}
					isCreating={ctx.isCreating}
				/>
			)}
		</CreateNewSlideContext.Consumer>
	</CreateNewSlideProvider>
);

export default CreateNewSlideWithCreateNewSlideContext;
