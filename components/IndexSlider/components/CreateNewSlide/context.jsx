import React from "react";
import PropTypes from "prop-types";
import { withAsyncSetState, parseError, fetch } from "@utils";
import { FetcherContext, CollectionsContext } from "@providers";
import { FETCH_ADD_SLIDE } from "@consts/_fetch";
import { SLIDE_MODEL } from "@consts/_models";
import { IndexSliderContext } from "../../context";

export const CreateNewSlideContext = React.createContext();

class CreateNewSlideProviderClass extends React.Component {
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

	createSlideSuccess = ({ data }) => {
		const { appendSlide, insertSlide } = this.props;

		return this.asyncSetState({
			isHydrating: false,
			isCreating: false,
			temporarySlide: {}
		})
			.then(() => insertSlide(data))
			.then(() => appendSlide(data));
	};

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

	getTypeError = field => {
		const { typeErrors } = this.state;
		const error = typeErrors && typeErrors[field];
		return error && error.msg;
	};

	render = () => (
		<CreateNewSlideContext.Provider
			value={{
				error: this.state.error,
				isHydrating: this.state.isHydrating,
				temporarySlide: this.state.temporarySlide,
				createSlideStart: this.createSlideStart,
				isCreating: this.state.isCreating,
				handleCreating: this.handleCreating,
				getTypeError: this.getTypeError,
				handleTemporarySlide: this.handleTemporarySlide
			}}
		>
			{this.props.children}
		</CreateNewSlideContext.Provider>
	);
}

CreateNewSlideProviderClass.propTypes = {
	children: PropTypes.element.isRequired,
	appendSlide: PropTypes.func.isRequired,
	fetcher: PropTypes.func.isRequired,
	insertSlide: PropTypes.func.isRequired
};

const CreateNewSlideProviderWithAsyncSetState = withAsyncSetState(
	CreateNewSlideProviderClass
);

const CreateNewSlideContextWithIndexSliderContext = props => (
	<IndexSliderContext.Consumer>
		{ctx => (
			<CreateNewSlideProviderWithAsyncSetState
				{...props}
				appendSlide={slide => ctx.handleSlides(slides => [...slides, slide])}
			/>
		)}
	</IndexSliderContext.Consumer>
);

const CreateNewSlideWithFetcherContext = props => (
	<FetcherContext.Consumer>
		{ctx => (
			<CreateNewSlideContextWithIndexSliderContext
				{...props}
				fetcher={ctx.fetcher}
			/>
		)}
	</FetcherContext.Consumer>
);

const CreateNewSlideWithCollectionsContext = props => (
	<CollectionsContext.Consumer>
		{ctx => (
			<CreateNewSlideWithFetcherContext
				{...props}
				insertSlide={slide => ctx.insertDocuments(SLIDE_MODEL, [slide])}
			/>
		)}
	</CollectionsContext.Consumer>
);

export const CreateNewSlideProvider = CreateNewSlideWithCollectionsContext;
