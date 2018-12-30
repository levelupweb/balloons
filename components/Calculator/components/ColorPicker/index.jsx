import React from "react";
import PropTypes from "prop-types";
import classes from "classnames";
import { Menu } from "semantic-ui-react";
import Icon from "@components/Icon";
import { isFunction } from "@utils";
import Margin from "@components/Margin";
import { availableColors } from "./availableColors";
import { CirclePicker } from "react-color";
import styles from "./styles";

class ColorPicker extends React.Component {
	state = {
		currentIndex: 0
	};

	handleIndex = nextIndex => {
		const { onChangeIndex } = this.props;

		this.setState(
			{
				currentIndex: nextIndex
			},
			() => isFunction(onChangeIndex) && onChangeIndex(nextIndex)
		);
	};

	handleChange = ({ hex }) => {
		const { currentIndex } = this.state;
		const { colors, onChange } = this.props;

		if (colors) {
			return onChange(
				colors.map((color, i) => (i === currentIndex ? hex : color))
			);
		}

		return onChange(hex);
	};

	addColor = () => {
		const { max, colors, onChange } = this.props;
		if (colors.length <= max) {
			onChange([...colors, "#000"]);
			this.setState({
				currentIndex: this.state.currentIndex + 1
			});
		}
	};

	removeColor = index => {
		const { colors, onChange } = this.props;

		this.setState(
			{
				currentIndex: this.state.currentIndex - 1
			},
			() => onChange(colors.filter((_, i) => i !== index))
		);
	};

	getCurrentColor = (index = this.state.currentIndex) => {
		const { color, colors } = this.props;

		if (colors) {
			return colors[index];
		}

		return color;
	};

	render = () => {
		const { currentIndex } = this.state;
		const { colors, max, fluid } = this.props;

		return (
			<div className={classes(styles.picker, { [styles.fluid]: fluid })}>
				{colors && (
					<Margin right>
						<React.Fragment>
							<Menu
								className={styles.menu}
								fitted
								inverted
								secondary
								compact
								floated="left"
								vertical
							>
								{colors.map((_, index) => (
									<Menu.Item
										as="div"
										className={styles.item}
										key={index}
										active={index === currentIndex}
										onClick={() => this.handleIndex(index)}
									>
										<div className={styles.inner}>
											<span
												style={{
													backgroundColor: this.getCurrentColor(index)
												}}
												className={styles.color}
											/>
											<span className={styles.title}>{index + 1} цвет</span>
											{index !== 0 && (
												<Icon
													icon="close"
													size={16}
													className={styles.removeIcon}
													onClick={() => this.removeColor(index)}
												/>
											)}
										</div>
									</Menu.Item>
								))}
								{colors.length !== max ? (
									<Menu.Item
										as="div"
										className={styles.item}
										onClick={this.addColor}
									>
										<Icon className={styles.addIcon} icon="add" size={16} />
										<span className={styles.title}>Добавить</span>
									</Menu.Item>
								) : null}
							</Menu>
						</React.Fragment>
					</Margin>
				)}
				<CirclePicker
					onChange={this.handleChange}
					colors={availableColors}
					color={this.getCurrentColor()}
				/>
			</div>
		);
	};
}

ColorPicker.propTypes = {
	colors: PropTypes.arrayOf(PropTypes.string),
	color: PropTypes.string,
	fluid: PropTypes.bool,
	onChange: PropTypes.func.isRequired,
	max: PropTypes.number,
	onChangeIndex: PropTypes.func
};

ColorPicker.defaultProps = {
	max: null,
	color: null,
	colors: null,
	fluid: false,
	onColorSelect: null
};

export default ColorPicker;
