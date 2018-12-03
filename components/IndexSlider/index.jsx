import React from "react";
import PropTypes from "prop-types";
import OneSlideSlider from "@components/OneSlideSlider";
import { EditContext } from "@providers";
import Slide from "./components/Slide";
import EditBar from "./components/EditBar";
import styles from "./styles";
import { IndexSliderContext, IndexSliderProvider } from "./context";

class IndexSlider extends React.Component {
	componentDidMount = () => {
		const { slides, fetchSlidesStart } = this.props;

		if (!slides) {
			fetchSlidesStart();
		}
	};

	renderSlides = () => {
		const { slides } = this.props;

		if (slides) {
			return slides.map((slide, index) => <Slide key={index} slide={slide} />);
		}
	};

	render = () => {
		const { isEditing } = this.props;

		return (
			<div className={styles.slider}>
				<OneSlideSlider>{this.renderSlides()}</OneSlideSlider>
				{isEditing && (
					<div className={styles.editBar}>
						<EditBar />
					</div>
				)}
			</div>
		);
	};
}

IndexSlider.propTypes = {
	isEditing: PropTypes.bool.isRequired,
	slides: PropTypes.arrayOf(PropTypes.object),
	error: PropTypes.string,
	fetchSlidesStart: PropTypes.func.isRequired
};

const IndexSliderWithProvider = props => (
	<IndexSliderProvider>
		<IndexSliderContext.Consumer>
			{ctx => (
				<IndexSlider
					{...props}
					isHydrating={ctx.isHydrating}
					fetchSlidesStart={ctx.fetchSlidesStart}
					error={ctx.error}
					slides={ctx.slides}
				/>
			)}
		</IndexSliderContext.Consumer>
	</IndexSliderProvider>
);

const IndexSliderWithEditContext = props => (
	<EditContext.Consumer>
		{ctx => <IndexSliderWithProvider {...props} isEditing={ctx.isEditing} />}
	</EditContext.Consumer>
);

export default IndexSliderWithEditContext;
