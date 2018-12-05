import React from "react";
import classes from "classnames";
import PropTypes from "prop-types";
import NukaCarousel from "nuka-carousel";
import { Loader, Button, Icon } from "semantic-ui-react";
import { EditContext } from "@providers";
import Slide from "./components/Slide";
import EditBar from "./components/EditBar";
import styles from "./styles";
import { IndexSliderContext, IndexSliderProvider } from "./context";

class IndexSlider extends React.Component {
	state = {
		carousel: null
	};

	handleDimensions = () => {
		const { carousel } = this.state;

		if (carousel) {
			carousel.setDimensions();
		}
	};

	handleCarouselRef = carousel =>
		this.setState({
			carousel
		});

	componentDidMount = () => {
		const { slides, fetchSlidesStart } = this.props;

		if (!slides) {
			return fetchSlidesStart().then(this.handleDimensions);
		}

		this.handleDimensions();
	};

	renderSlides = () => {
		const { slides } = this.props;

		if (slides) {
			return slides.map(slideId => <Slide key={slideId} slideId={slideId} />);
		}
	};

	renderSlider = () => {
		const { isHydrating, slides } = this.props;

		if (!slides || isHydrating) {
			return (
				<div className={styles.placeholder}>
					<Loader active centered inline />
				</div>
			);
		}

		return this.renderSlides();
	};

	renderLeft = ({ previousSlide }) => (
		<Button
			circular
			inverted
			onClick={previousSlide}
			className={classes(styles.button, styles.left)}
			icon
		>
			<Icon name="chevron left" />
		</Button>
	);

	renderRight = ({ nextSlide }) => (
		<Button
			circular
			inverted
			onClick={nextSlide}
			className={classes(styles.button, styles.right)}
			icon
		>
			<Icon name="chevron right" />
		</Button>
	);

	render = () => {
		const { isEditing } = this.props;

		return (
			<div className={styles.slider}>
				<NukaCarousel
					heightMode="first"
					width="100%"
					ref={this.handleCarouselRef}
					autoplay
					autoplayInterval={10000}
					slidesToShow={1}
					wrapAround
					initialSlideWidth="100%"
					renderCenterLeftControls={data => this.renderLeft(data)}
					renderCenterRightControls={data => this.renderRight(data)}
				>
					{this.renderSlider()}
				</NukaCarousel>
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
	isHydrating: PropTypes.bool.isRequired,
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
