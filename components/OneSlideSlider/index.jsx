import React from "react";
import PropTypes from "prop-types";
import classes from "classnames";
import Icon from "@components/Icon";
import { withAsyncSetState, getWidthElement, isFunction } from "@utils";
import styles from "./styles";

class OneSlideSlider extends React.Component {
	state = {
		currentSlide: this.props.slide,
		slideWidth: null,
		ref: null
	};

	componentDidUpdate = (prevProps, prevState) => {
		const { ref } = this.state;

		if (!prevState.ref && ref) {
			this.setState({
				slideWidth: getWidthElement(ref, true)
			});

			window.addEventListener("resize", this.resizeHandler);
		}

		const { slide } = this.props;

		if (prevProps.slide !== slide) {
			this.setState({
				currentSlide: slide
			});
		}
	};

	componentWillUnmount = () => {
		window.removeEventListener("resize", this.resizeHandler);
	};

	resizeHandler = () => {
		const { ref } = this.state;

		this.setState({
			slideWidth: getWidthElement(ref, true)
		});
	};

	handleSlide = nextSlide => {
		const { children, onChange } = this.props;

		let realNextSlide = nextSlide;

		if (nextSlide > children.length - 1) {
			realNextSlide = 0;
		}

		if (nextSlide < 0) {
			realNextSlide = children.length - 1;
		}

		return this.asyncSetState({
			currentSlide: realNextSlide
		}).then(() => isFunction(onChange) && onChange(realNextSlide));
	};

	handleRef = ref =>
		this.asyncSetState({
			ref
		});

	getOffset = () => {
		const { slideWidth, currentSlide } = this.state;
		const { gap } = this.props;

		return (slideWidth + gap) * currentSlide;
	};

	getTrackWidth = () => {
		const { slideWidth } = this.state;
		const { children, gap } = this.props;

		return (slideWidth + gap) * children.length;
	};

	render = () => {
		const { ref, currentSlide, slideWidth } = this.state;

		const {
			children,
			arrowClassName,
			displayArrows,
			gap,
			style,
			displayDots,
			className
		} = this.props;

		return (
			<div style={style} className={classes(styles.wrapper, className)}>
				<div className={styles.slider} ref={this.handleRef}>
					{ref && slideWidth && (
						<React.Fragment>
							<div
								className={styles.track}
								style={{
									width: this.getTrackWidth(),
									transform: `translate3d(-${this.getOffset()}px, 0, 0)`
								}}
							>
								{React.Children.map(children, (item, index) => (
									<div
										className={styles.item}
										style={{ marginRight: gap }}
										ariaHidden={currentSlide === index ? "true" : "false"}
									>
										{item}
									</div>
								))}
							</div>
							{displayDots && (
								<div className={styles.dots}>
									{Array(children.length)
										.fill(1)
										.map((_, index) => (
											<div
												onClick={() => this.handleSlide(index)}
												className={classes(styles.dot, {
													[styles.active]: currentSlide === index
												})}
												key={index}
											/>
										))}
								</div>
							)}
						</React.Fragment>
					)}
				</div>
				{displayArrows && children.length > 1 && (
					<React.Fragment>
						<div
							className={classes(styles.arrow, styles.left, arrowClassName)}
							onClick={() => this.handleSlide(currentSlide - 1)}
						>
							<Icon className={styles.icon} icon="chevron-left" size={22} />
						</div>
						<div
							className={classes(styles.arrow, styles.right, arrowClassName)}
							onClick={() => this.handleSlide(currentSlide + 1)}
						>
							<Icon className={styles.icon} icon="chevron-right" size={22} />
						</div>
					</React.Fragment>
				)}
			</div>
		);
	};
}

OneSlideSlider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
	onChange: PropTypes.func,
	slide: PropTypes.number,
	gap: PropTypes.number,
	displayDots: PropTypes.bool,
	displayArrows: PropTypes.bool,
	className: PropTypes.string,
	style: PropTypes.object,
	arrowClassName: PropTypes.string
};

OneSlideSlider.defaultProps = {
	children: [],
	arrowClassName: null,
	className: null,
	style: {},
	displayArrows: true,
	displayDots: true,
	slide: 0,
	onChange: null,
	gap: 20
};

const OneSlideSliderWithAsyncSetState = withAsyncSetState(OneSlideSlider);

export default OneSlideSliderWithAsyncSetState;
