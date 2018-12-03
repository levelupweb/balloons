import React from "react";
import PropTypes from "prop-types";
import { fetch, parseError, getStorageUrl, withAsyncSetState } from "@utils";
import { FetcherContext } from "@providers";
import Margin from "@components/Margin";
import { Heading } from "@components/Typography";
import Input from "@components/Input";
import TextArea from "@components/TextArea";
import Button from "@components/Button";
import FileUploader from "@components/FileUploader";
import { BUTTON_VARIANT_DEFAULT } from "@components/Button/consts";
import { FETCH_UPDATE_SLIDE, FETCH_REMOVE_SLIDE } from "@consts/_fetch";
import { SLIDE_TITLE, SLIDE_DESCRIPTION, SLIDE_IMAGE_URL } from "@consts/slide";
import styles from "./styles";
import { IndexSliderContext } from "../../context";

class EditSlide extends React.Component {
	state = {
		temporarySlide: this.props.slide,
		updating: {
			isHydrating: false,
			error: null,
			typeErrors: null
		},
		removing: {
			isHydrating: false,
			error: null
		}
	};

	handleTemporarySlide = data =>
		this.asyncSetState({
			temporarySlide: {
				...this.state.temporarySlide,
				...data
			}
		});

	handleUpdatingState = data =>
		this.asyncSetState({
			updating: {
				...this.state.updating,
				...data
			}
		});

	updateSlideStart = () =>
		this.handleUpdatingState({
			isHydrating: true,
			typeErrors: null,
			error: null
		})
			.then(this.performUpdate)
			.then(this.updateSlideSuccess)
			.catch(this.updateSlideFail);

	performUpdate = () => {
		const { temporarySlide } = this.state;
		const { fetcher } = this.props;

		return fetch(fetcher, FETCH_UPDATE_SLIDE, temporarySlide, {
			params: {
				slideId: temporarySlide._id
			}
		});
	};

	updateSlideSuccess = ({ data }) =>
		this.handleUpdatingState({
			isHydrating: false,
			temporarySlide: data
		}).then(() => this.props.handleInfo("Слайд был успешно обновлён"));

	updateSlideFail = reason => {
		const error = parseError(reason);

		if (typeof error === "string") {
			return this.handleUpdatingState({
				error,
				isHydrating: false
			});
		}

		return this.handleUpdatingState({
			typeErrors: error,
			isHydrating: false
		});
	};

	handleRemovingState = data =>
		this.asyncSetState({
			removing: {
				...this.state.removing,
				...data
			}
		});

	removeSlideStart = () =>
		this.handleRemovingState({
			isHydrating: true,
			error: null,
			typeErrors: null
		})
			.then(this.performRemove)
			.then(this.removeSlideSuccess)
			.catch(this.removeSlideFail);

	performRemove = () => {
		const { temporarySlide } = this.state;
		const { fetcher } = this.props;

		return fetch(fetcher, FETCH_REMOVE_SLIDE, {
			params: {
				slideId: temporarySlide._id
			}
		});
	};

	removeSlideSuccess = ({ data }) =>
		this.handleRemovingState({
			isHydrating: false,
			temporarySlide: data
		}).then(() => this.props.handleInfo("Слайд был успешно удалён"));

	removeSlideFail = reason => {
		const error = parseError(reason);

		if (typeof error === "string") {
			return this.handleRemovingState({
				error,
				isHydrating: false
			});
		}

		return this.handleRemovingState({
			typeErrors: error,
			isHydrating: false
		});
	};

	getTypeError = field => {
		const { updating } = this.state;
		const error = updating.typeErrors && updating.typeErrors[field];
		return error && error.msg;
	};

	render = () => {
		const { temporarySlide, updating, removing } = this.state;
		const { index } = this.props;

		return (
			<div className={styles.slide}>
				<Heading className={styles.title} as="h4" size={5}>
					Слайд №{index}
				</Heading>
				<div className={styles.main}>
					<div className={styles.image}>
						<Margin top right>
							<img src={getStorageUrl(temporarySlide[SLIDE_IMAGE_URL])} />
						</Margin>
					</div>
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
				<Margin top>
					<div className={styles.actions}>
						<FileUploader
							buttonProps={{
								basic: true,
								children: "Новое изображение",
								variant: BUTTON_VARIANT_DEFAULT,
								icon: "upload"
							}}
							onUrl={url =>
								this.handleTemporarySlide({
									[SLIDE_IMAGE_URL]: url
								})
							}
						/>
						<Button
							basic
							onClick={this.updateSlideStart}
							loading={updating.isHydrating}
							icon="check"
						>
							Сохранить
						</Button>
						<Button
							loading={removing.isHydrating}
							onClick={this.removeSlideStart}
							basic
							icon="close"
						>
							Удалить
						</Button>
					</div>
				</Margin>
			</div>
		);
	};
}

EditSlide.propTypes = {
	fetcher: PropTypes.object.isRequired,
	slide: PropTypes.object.isRequired,
	index: PropTypes.number.isRequired,
	handleInfo: PropTypes.func.isRequired
};

const EditSlideWithAsyncSetState = withAsyncSetState(EditSlide);

const EditSlideWithFetcherContext = props => (
	<FetcherContext.Consumer>
		{ctx => <EditSlideWithAsyncSetState {...props} fetcher={ctx.fetcher} />}
	</FetcherContext.Consumer>
);

const EditSlideWithIndexSliderContext = props => (
	<IndexSliderContext.Consumer>
		{ctx => (
			<EditSlideWithFetcherContext {...props} handleInfo={ctx.handleInfo} />
		)}
	</IndexSliderContext.Consumer>
);

export default EditSlideWithIndexSliderContext;
