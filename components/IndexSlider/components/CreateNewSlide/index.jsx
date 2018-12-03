import React from "react";
import PropTypes from "prop-types";
import { withAsyncSetState, getStorageUrl, parseError, fetch } from "@utils";
import classes from "classnames";
import { FetcherContext } from "@providers";
import { FETCH_ADD_SLIDE } from "@consts/_fetch";
import { NOTIFICATION_VARIANT_DANGER } from "@components/Notification/consts";
import FileUploader from "@components/FileUploader";
import Notification from "@components/Notification";
import { Paragraph } from "@components/Typography";
import Input from "@components/Input";
import TextArea from "@components/TextArea";
import Button from "@components/Button";
import Margin from "@components/Margin";
import { SLIDE_IMAGE_URL, SLIDE_TITLE, SLIDE_DESCRIPTION } from "@consts/slide";
import { IndexSliderContext } from "../../context";
import styles from "./styles";

import {
	BUTTON_VARIANT_DEFAULT,
	BUTTON_VARIANT_SUCCESS
} from "@components/Button/consts";

class CreateNewSlide extends React.Component {
	state = {
		temporarySlide: {},
		isCreating: false,
		error: null,
		typeErrors: null
	};

	handleTemporarySlide = data =>
		this.asyncSetState({
			temporarySlide: {
				...this.state.temporarySlide,
				...data
			}
		});

	handleCreating = isCreating =>
		this.asyncSetState({
			isCreating
		});

	createSlideStart = () =>
		this.asyncSetState({
			isHydrating: true,
			error: null,
			typeErrors: null
		})
			.then(this.performUpdate)
			.then(this.createSlideSuccess)
			.catch(this.createSlideFail);

	performUpdate = () => {
		const { temporarySlide } = this.state;
		const { fetcher } = this.props;

		return fetch(fetcher, FETCH_ADD_SLIDE, temporarySlide);
	};

	createSlideSuccess = ({ data }) =>
		this.asyncSetState({
			isHydrating: false,
			temporarySlide: data
		}).then(() =>
			this.props.handleInfo("Слайд был успешно создан. Обновите страницу")
		);

	createSlideFail = reason => {
		const error = parseError(reason);

		if (typeof error === "string") {
			return this.asyncSetState({
				error,
				isHydrating: false
			});
		}

		return this.asyncSetState({
			typeErrors: error,
			isHydrating: false
		});
	};

	renderImage = () => {
		const { temporarySlide } = this.state;

		if (temporarySlide[SLIDE_IMAGE_URL]) {
			return <img src={getStorageUrl(temporarySlide[SLIDE_IMAGE_URL])} />;
		}

		const error = this.getTypeError(SLIDE_IMAGE_URL);

		return (
			<div className={classes(styles.noimage, { [styles.error]: !!error })}>
				<Paragraph>Без изображения</Paragraph>
			</div>
		);
	};

	getTypeError = field => {
		const { typeErrors } = this.state;
		const error = typeErrors && typeErrors[field];
		return error && error.msg;
	};

	render = () => {
		const { isCreating, isHydrating, temporarySlide, error } = this.state;

		if (!isCreating) {
			return (
				<div className={styles.centered}>
					<Button
						className={styles.createButton}
						icon="add"
						onClick={() => this.handleCreating(true)}
					>
						Создать слайд
					</Button>
				</div>
			);
		}

		return (
			<div className={styles.form}>
				<div className={styles.main}>
					<Margin right>
						<div className={styles.image}>{this.renderImage()}</div>
					</Margin>
					<div className={styles.content}>
						<Input
							fluid
							error={this.getTypeError(SLIDE_TITLE)}
							placeholder="Введите заголовок для слайда"
							value={temporarySlide[SLIDE_TITLE]}
							onChange={(_, value) =>
								this.handleTemporarySlide({
									[SLIDE_TITLE]: value
								})
							}
						/>
						<Margin top>
							<TextArea
								fluid
								autoHeight
								error={this.getTypeError(SLIDE_DESCRIPTION)}
								placeholder="Введите текст под заголовком.."
								value={temporarySlide[SLIDE_DESCRIPTION]}
								onChange={(_, value) =>
									this.handleTemporarySlide({
										[SLIDE_DESCRIPTION]: value
									})
								}
							/>
						</Margin>
					</div>
				</div>
				{error && (
					<Margin top>
						<Notification
							content={error}
							variant={NOTIFICATION_VARIANT_DANGER}
						/>
					</Margin>
				)}
				<Margin top>
					<div className={styles.actions}>
						<FileUploader
							onUrl={url =>
								this.handleTemporarySlide({
									[SLIDE_IMAGE_URL]: url
								})
							}
							buttonProps={{
								variant: BUTTON_VARIANT_DEFAULT,
								icon: "upload",
								basic: true
							}}
						/>
						<Button
							loading={isHydrating}
							basic
							icon="check"
							variant={BUTTON_VARIANT_SUCCESS}
							onClick={this.createSlideStart}
						>
							Готово
						</Button>
					</div>
				</Margin>
			</div>
		);
	};
}

CreateNewSlide.propTypes = {
	fetcher: PropTypes.func.isRequired,
	handleInfo: PropTypes.func.isRequired
};

const CreateNewSlideWithAsyncSetState = withAsyncSetState(CreateNewSlide);

const CreateNewSlideWithFetcherContext = props => (
	<FetcherContext.Consumer>
		{ctx => (
			<CreateNewSlideWithAsyncSetState {...props} fetcher={ctx.fetcher} />
		)}
	</FetcherContext.Consumer>
);

const EditSlideWithIndexSliderContext = props => (
	<IndexSliderContext.Consumer>
		{ctx => (
			<CreateNewSlideWithFetcherContext
				{...props}
				handleInfo={ctx.handleInfo}
			/>
		)}
	</IndexSliderContext.Consumer>
);

export default EditSlideWithIndexSliderContext;
