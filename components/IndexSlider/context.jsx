import React from "react";
import PropTypes from "prop-types";
import { withAsyncSetState, fetch, parseError } from "@utils";
import { FetcherContext } from "@providers";
import { FETCH_SLIDES } from "@consts/_fetch";

const defaultState = {
	isHydrating: false,
	error: null,
	info: null,
	slides: null
};

export const IndexSliderContext = React.createContext(defaultState);

class IndexSliderProviderClass extends React.Component {
	state = defaultState;

	fetchSlidesStart = () =>
		this.asyncSetState(defaultState)
			.then(this.performFetch)
			.then(this.fetchSlidesSuccess)
			.catch(this.fetchSlidesFail);

	performFetch = () => {
		const { fetcher } = this.props;

		return fetch(fetcher, FETCH_SLIDES);
	};

	fetchSlidesSuccess = ({ data }) =>
		this.asyncSetState({
			slides: data,
			isHydrating: false
		});

	fetchSlidesFail = reason =>
		this.asyncSetState({
			error: parseError(reason),
			isHydrating: false
		});

	handleInfo = newInfo =>
		this.asyncSetState({
			info: newInfo
		});

	render = () => (
		<IndexSliderContext.Provider
			value={{
				slides: this.state.slides,
				isHydrating: this.state.isHydrating,
				handleInfo: this.handleInfo,
				info: this.state.info,
				error: this.state.error,
				fetchSlidesStart: this.fetchSlidesStart
			}}
		>
			{this.props.children}
		</IndexSliderContext.Provider>
	);
}

IndexSliderProviderClass.propTypes = {
	children: PropTypes.element.isRequired,
	fetcher: PropTypes.func.isRequired
};

const IndexSliderProviderWithAsyncSetState = withAsyncSetState(
	IndexSliderProviderClass
);

const IndexSliderProviderWithFetcher = props => (
	<FetcherContext.Consumer>
		{ctx => (
			<IndexSliderProviderWithAsyncSetState {...props} fetcher={ctx.fetcher} />
		)}
	</FetcherContext.Consumer>
);

export const IndexSliderProvider = IndexSliderProviderWithFetcher;
