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

	handleFocused = isFocused =>
		this.setState(
			{
				isFocused
			},
			() => {
				const main = document.getElementById("main-container");

				if (isFocused) {
					setTimeout(() => {
						main.classList.add("dimmed");
					}, 200);
				} else {
					main.classList.remove("dimmed");
				}
			}
		);

	render = () => {
		const { img, title, description } = this.props;
		const { isFocused } = this.state;
		return (
			<div
				onMouseEnter={() => this.handleFocused(true)}
				onMouseLeave={() => this.handleFocused(false)}
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
