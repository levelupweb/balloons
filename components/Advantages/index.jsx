import React from "react";
import classes from "classnames";
import Masonry from "react-masonry-component";
import PropTypes from "prop-types";
import styles from "./styles";
import Margin from "@components/Margin";
import { Heading, Paragraph } from "@components/Typography";

class Advantage extends React.Component {
	state = {
		isFocused: false,
		element: null
	};

	componentWillUnmount = () => {
		if (this.state.element) {
			window.removeEventListener("scroll", this.handleScroll);
			window.removeEventListener("click", this.handleOutsideClick);
		}
	};

	componentDidUpdate = (_, prevState) => {
		const { element } = this.state;

		if (prevState.element !== element && element !== null) {
			this.bindElementEvents(element);
			this.bindWindowEvents();
		}
	};

	bindWindowEvents = () => {
		window.addEventListener("scroll", this.handleScroll);
		window.addEventListener("click", this.handleOutsideClick);
	};

	bindElementEvents = element => {
		element.addEventListener("mouseenter", this.handleMouseEnter);
		element.addEventListener("mouseleave", this.handleMouseLeave);
		element.addEventListener("touchstart", this.handleTouchStart);
		element.addEventListener("touchmove", this.handleTouchMove);
	};

	handleRef = element =>
		this.setState({
			element
		});

	handleScroll = () => {
		if (this.state.isFocused) {
			this.handleFocus(false);
		}
	};

	handleTouchStart = () => {
		if (!this.state.isFocused) {
			this.handleFocus(true);
		}
	};

	handleElementClick = () => {
		if (!this.state.isFocused) {
			this.handleFocus(true);
		}
	};

	handleOutsideClick = event => {
		if (this.state.isFocused && !this.state.element.contains(event.target)) {
			this.handleFocus(false);
		}
	};

	handleMouseEnter = () => {
		if (!this.state.isFocused) {
			this.handleFocus(true);
		}
	};

	handleMouseLeave = () => {
		const { isFocused } = this.state;

		const main = document.getElementById("main-container");

		if (main && (isFocused || main.classList.contains("dimmed"))) {
			this.handleFocus(false);
		}
	};

	handleFocus = isFocused => {
		const main = document.getElementById("main-container");

		this.setState(
			{
				isFocused
			},
			() => {
				if (!isFocused) {
					main.classList.remove("dimmed");
				} else {
					setTimeout(() => {
						const { isFocused } = this.state;

						if (isFocused && main) {
							main.classList.add("dimmed");
						}
					}, 200);
				}
			}
		);
	};

	render = () => {
		const { img, title, description } = this.props;
		const { isFocused } = this.state;

		return (
			<div
				ref={this.handleRef}
				className={classes(styles.item, { [styles.focused]: isFocused })}
			>
				<div className={styles.inner}>
					<img src={img} width={62} title={title} />
					<Margin top>
						<Heading as="h4" size={5}>
							{title}
						</Heading>
						<Margin top half>
							<Paragraph>{description}</Paragraph>
						</Margin>
					</Margin>
				</div>
			</div>
		);
	};
}

Advantage.propTypes = {
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	img: PropTypes.string.isRequired
};

const Advantages = ({ children }) => (
	<div className={styles.items}>
		<div className={styles.sizer} />
		<Masonry
			className={styles.masonry}
			masonryOptions={{
				itemSelector: `.${styles.item}`,
				columnWidth: `.${styles.sizer}`
			}}
			updateOnEachImageLoad
		>
			{children.map((item, index) => {
				const [title, description, img] = item;

				return (
					<Advantage
						title={title}
						description={description}
						img={img}
						key={index}
					/>
				);
			})}
		</Masonry>
	</div>
);

Advantages.propTypes = {
	children: PropTypes.arrayOf(PropTypes.array)
};

export default Advantages;
