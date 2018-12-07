import React from "react";
import classes from "classnames";
import Masonry from "react-masonry-component";
import PropTypes from "prop-types";
import styles from "./styles";
import Margin from "@components/Margin";
import { Heading, Paragraph } from "@components/Typography";

class Advantage extends React.Component {
	state = {
		isFocused: false
	};

	handleRef = element => {
		if (!element) {
			return;
		}

		window.addEventListener("scroll", this.handleMouseLeave);
		element.addEventListener("mouseenter", this.handleMouseEnter);
		element.addEventListener("touchstart", this.handleMouseEnter);
		element.addEventListener("mouseleave", this.handleMouseLeave);
		element.addEventListener("touchend", this.handleMouseLeave);
	};

	handleMouseEnter = () => {
		const { isFocused } = this.state;

		if (!isFocused) {
			const main = document.getElementById("main-container");

			this.setState(
				{
					isFocused: true
				},
				() => {
					setTimeout(() => {
						const { isFocused } = this.state;
						if (isFocused && main) {
							main.classList.add("dimmed");
						}
					}, 200);
				}
			);
		}
	};

	handleMouseLeave = () => {
		const { isFocused } = this.state;

		const main = document.getElementById("main-container");

		if (main && (isFocused || main.classList.contains("dimmed"))) {
			this.setState(
				{
					isFocused: false
				},
				() => {
					main.classList.remove("dimmed");
				}
			);
		}
	};

	handleMouseMove = () => {
		const { isFocused } = this.state;

		if (!isFocused) {
			const main = document.getElementById("main-container");
			main.classList.remove("dimmed");
		}
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
