import React from "react";
import PropTypes from "prop-types";
import Logo from "../Logo";
import OneSlideSlider from "@components/OneSlideSlider";
import { CalculatorContext } from "../../context";
import Dropdown from "../Dropdown";
import { Button } from "semantic-ui-react";
import Margin from "@components/Margin";
import { Paragraph } from "@components/Typography";
import ColorPicker from "../ColorPicker";
import styles from "./styles";

import {
	CALCULATOR_PARAM_LOGO,
	CALCULATOR_PARAM_LOGO_2,
	CALCULATOR_PARAM_LOGO_COLORS,
	CALCULATOR_PARAM_LOGO_COLORS_2
} from "../../consts";

class Logos extends React.Component {
	state = {
		logoKey: CALCULATOR_PARAM_LOGO,
		colorIndex: 0
	};

	indexToKey = index => {
		if (index === 0) {
			return CALCULATOR_PARAM_LOGO;
		}

		if (index === 1) {
			return CALCULATOR_PARAM_LOGO_2;
		}

		return null;
	};

	logoKeyToIndex = key => {
		if (key === CALCULATOR_PARAM_LOGO) {
			return 0;
		}

		if (key === CALCULATOR_PARAM_LOGO_2) {
			return 1;
		}

		return null;
	};

	handleLogo = logoKey =>
		this.setState({
			logoKey
		});

	getCurrentColors = () => {
		const { params } = this.props;
		const { logoKey } = this.state;

		if (
			logoKey === CALCULATOR_PARAM_LOGO &&
			params[CALCULATOR_PARAM_LOGO_COLORS]
		) {
			return params[CALCULATOR_PARAM_LOGO_COLORS];
		}

		if (
			logoKey === CALCULATOR_PARAM_LOGO_2 &&
			params[CALCULATOR_PARAM_LOGO_COLORS_2]
		) {
			return params[CALCULATOR_PARAM_LOGO_COLORS_2];
		}

		return [];
	};

	handleColorIndex = colorIndex =>
		this.setState({
			colorIndex
		});

	getUpdateColorsHandler = () => {
		const { logoKey } = this.state;
		const { handleParams } = this.props;

		if (logoKey === CALCULATOR_PARAM_LOGO) {
			return hexes =>
				handleParams(params => ({
					...params,
					[CALCULATOR_PARAM_LOGO_COLORS]: hexes
				}));
		}

		if (logoKey === CALCULATOR_PARAM_LOGO_2) {
			return hexes =>
				handleParams(params => ({
					...params,
					[CALCULATOR_PARAM_LOGO_COLORS_2]: hexes
				}));
		}

		return null;
	};

	hasCurrentLogo = () => {
		const { params } = this.props;
		const { logoKey } = this.state;

		return !!params[logoKey];
	};

	render = () => {
		const { logoKey } = this.state;
		const { params, handleParams } = this.props;

		const colors = this.getCurrentColors();

		return (
			<div className={styles.logos}>
				<OneSlideSlider
					displayArrows
					displayDots={false}
					arrowClassName={styles.arrows}
					slide={this.logoKeyToIndex(logoKey)}
					onChange={index => this.handleLogo(this.indexToKey(index))}
				>
					<div key={CALCULATOR_PARAM_LOGO} className={styles.slide}>
						<Logo
							colors={params[CALCULATOR_PARAM_LOGO_COLORS]}
							logo={params[CALCULATOR_PARAM_LOGO]}
							index={1}
							mime={params.mime1}
							handleLogo={(logo, mime1) =>
								handleParams(params => ({
									...params,
									[CALCULATOR_PARAM_LOGO]: logo,
									mime1
								}))
							}
						/>
					</div>
					<div key={CALCULATOR_PARAM_LOGO_2} className={styles.slide}>
						<Logo
							colors={params[CALCULATOR_PARAM_LOGO_COLORS_2]}
							logo={params[CALCULATOR_PARAM_LOGO_2]}
							mime={params.mime2}
							index={2}
							handleLogo={(logo, mime2) =>
								handleParams(params => ({
									...params,
									[CALCULATOR_PARAM_LOGO_2]: logo,
									mime2
								}))
							}
						/>
					</div>
				</OneSlideSlider>
				{this.hasCurrentLogo() && (
					<div className={styles.colorPicker}>
						<Dropdown
							className={styles.dropdown}
							triggerClassName={styles.trigger}
							trigger={
								<Button fluid circular color="black">
									Цвет логотипа
								</Button>
							}
						>
							<div className={styles.pickerWrapper}>
								<Margin bottom half>
									<Paragraph>
										Вы выбрали {colors.length} цветов для печати логотипа.
										Данная услуга считается дополнительной опцией
									</Paragraph>
								</Margin>
								<ColorPicker
									max={4}
									onChangeIndex={this.handleColorIndex}
									colors={colors}
									onChange={this.getUpdateColorsHandler()}
								/>
							</div>
						</Dropdown>
					</div>
				)}
			</div>
		);
	};
}

Logos.propTypes = {
	handleParams: PropTypes.func.isRequired,
	params: PropTypes.object.isRequired
};

const LogosWithCalculatorContext = props => (
	<CalculatorContext.Consumer>
		{ctx => (
			<Logos {...props} params={ctx.params} handleParams={ctx.handleParams} />
		)}
	</CalculatorContext.Consumer>
);

export default LogosWithCalculatorContext;
