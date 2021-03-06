import React from "react";
import classes from "classnames";
import { Button, Icon } from "semantic-ui-react";
import { debounce } from "throttle-debounce";
import Carousel from "nuka-carousel";
import Block from "@components/Block";
import styles from "./styles";

const clients = [
	require("./img/askona.png"),
	require("./img/sber.png"),
	require("./img/binbank.png"),
	require("./img/pizza.png"),
	require("./img/avtotrakt.png"),
	require("./img/brilliants.png"),
	require("./img/dns.png"),
	require("./img/dobro.png"),
	require("./img/mc.png"),
	require("./img/vladimir.png"),
	require("./img/bankofrussia.png"),
	require("./img/babybunm.png"),
	require("./img/vlgu.png"),
	require("./img/moscow.png")
];

class Clients extends React.Component {
	constructor(props) {
		super(props);

		this.debouncedResizeHandler = debounce(200, this.handleResize);
		this.state = {
			carousel: null,
			slidesToScroll: 3
		};
	}

	componentDidMount = () => {
		this.handleDimensions();
		this.handleResize();
		window.addEventListener("resize", this.debouncedResizeHandler);
	};

	componentWillUnmount = () => {
		window.removeEventListener("resize", this.debouncedResizeHandler);
	};

	handleResize = () => {
		const container = document.getElementById("main-container");
		if (container.offsetWidth < 740) {
			this.setState({
				slidesToScroll: 2
			});
		} else {
			this.setState({
				slidesToScroll: 3
			});
		}
	};

	shouldComponentUpdate = (_, prevState) => {
		const { slidesToScroll } = this.state;

		return slidesToScroll !== prevState.slidesToScroll;
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

	renderLeft = ({ previousSlide }) => (
		<Button
			circular
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
			onClick={nextSlide}
			className={classes(styles.button, styles.right)}
			icon
		>
			<Icon name="chevron right" />
		</Button>
	);

	render = () => {
		const { slidesToScroll } = this.state;

		return (
			<div className={styles.carousel}>
				<Carousel
					ref={this.handleCarouselRef}
					heightMode="first"
					width="100%"
					autoplay
					autoplayInterval={4000}
					slidesToShow={slidesToScroll}
					wrapAround
					initialSlideWidth="33%"
					slidesToScroll={slidesToScroll}
					renderCenterLeftControls={data => this.renderLeft(data)}
					renderCenterRightControls={data => this.renderRight(data)}
				>
					{clients.map((client, index) => (
						<div className={styles.item} key={index}>
							<Block className={styles.inner}>
								<img
									src={client}
									width="100%"
									title="Партнер Золотой стрекозы"
								/>
							</Block>
						</div>
					))}
				</Carousel>
			</div>
		);
	};
}

export default Clients;
