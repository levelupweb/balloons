import React from "react";
import PropTypes from "prop-types";
import { CollectionsContext, FetcherContext } from "@providers";
import { withAsyncSetState, parseError, fetch } from "@utils";
import { SLIDE_MODEL } from "@consts/_models";
import { FETCH_UPDATE_SLIDE, FETCH_REMOVE_SLIDE } from "@consts/_fetch";
import { IndexSliderContext } from "../../context";

export const EditSlideContext = React.createContext();

class EditSlideProviderClass extends React.Component {
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

	updateSlideSuccess = ({ data }) => {
		const { updateSlide } = this.props;

		return updateSlide(data).then(() =>
			this.handleUpdatingState({
				isHydrating: false,
				temporarySlide: data
			})
		);
	};

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

	removeSlideSuccess = ({ data }) => {
		const { handleInfo, removeSlide } = this.props;

		return this.handleRemovingState({
			isHydrating: false,
			temporarySlide: data
		})
			.then(() => removeSlide())
			.then(() => handleInfo("Слайд был успешно удалён"));
	};

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

	render = () => (
		<EditSlideContext.Provider
			value={{
				temporarySlide: this.state.temporarySlide,
				updating: this.state.updating,
				removing: this.state.removing,
				handleTemporarySlide: this.handleTemporarySlide,
				updateSlideStart: this.updateSlideStart,
				removeSlideStart: this.removeSlideStart,
				getTypeError: this.getTypeError,
				index: this.props.index
			}}
		>
			{this.props.children}
		</EditSlideContext.Provider>
	);
}

EditSlideProviderClass.propTypes = {
	slide: PropTypes.object.isRequired,
	fetcher: PropTypes.func.isRequired,
	updateSlide: PropTypes.func.isRequired,
	handleInfo: PropTypes.func.isRequired,
	children: PropTypes.element.isRequired,
	index: PropTypes.number.isRequired,
	removeSlide: PropTypes.func.isRequired
};

const EditSlideProviderClassWithAsyncSetState = withAsyncSetState(
	EditSlideProviderClass
);

const EditSlideProviderClassWithIndexSliderContext = props => (
	<IndexSliderContext.Consumer>
		{ctx => (
			<EditSlideProviderClassWithAsyncSetState
				{...props}
				handleInfo={ctx.handleInfo}
				removeSlide={() =>
					ctx.handleSlides(slides =>
						slides.filter(slideId => slideId !== props.slideId)
					)
				}
			/>
		)}
	</IndexSliderContext.Consumer>
);

const EditSlideProviderClassWithCollectionsContext = props => (
	<CollectionsContext.Consumer>
		{ctx => (
			<EditSlideProviderClassWithIndexSliderContext
				{...props}
				slide={ctx.getEntity(SLIDE_MODEL, props.slideId)}
				updateSlide={slide =>
					ctx.updateDocument(SLIDE_MODEL, props.slideId, slide)
				}
			/>
		)}
	</CollectionsContext.Consumer>
);

EditSlideProviderClassWithCollectionsContext.propTypes = {
	slideId: PropTypes.string.isRequired
};

const EditSlideProviderClassWithFetcherContext = props => (
	<FetcherContext.Consumer>
		{ctx => (
			<EditSlideProviderClassWithCollectionsContext
				{...props}
				fetcher={ctx.fetcher}
			/>
		)}
	</FetcherContext.Consumer>
);

export const EditSlideProvider = EditSlideProviderClassWithFetcherContext;
