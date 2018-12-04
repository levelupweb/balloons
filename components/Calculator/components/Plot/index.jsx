import React from "react";
import PropTypes from "prop-types";
import { Button } from "semantic-ui-react";
import { Paragraph } from "@components/Typography";
import ScalableSVG from "@components/ScalableSVG";
import Margin from "@components/Margin";
import Dropdown from "../Dropdown";
import Logos from "../Logos";
import ColorPicker from "../ColorPicker";
import { CalculatorContext } from "../../context";
import styles from "./styles";
import { CALCULATOR_PARAM_COLOR, CALCULATOR_PARAM_LOGO } from "../../consts";

class Plot extends React.Component {
	getLogoHandler = () => {
		const { handleParam } = this.props;

		return url => handleParam(CALCULATOR_PARAM_LOGO, url);
	};

	render = () => {
		const { params, handleParam } = this.props;

		return (
			<div className={styles.plot}>
				<ScalableSVG
					url={require("../../svg/balloon.svg")}
					fill={params[CALCULATOR_PARAM_COLOR]}
				/>
				<div className={styles.colorPicker}>
					<Dropdown
						left
						trigger={
							<Button circular color="black">
								Цвет шара
							</Button>
						}
					>
						<div className={styles.wrapper}>
							<Margin bottom>
								<Paragraph>Выберите цвет шара</Paragraph>
							</Margin>
							<ColorPicker
								color={params[CALCULATOR_PARAM_COLOR]}
								onChange={hex => handleParam(CALCULATOR_PARAM_COLOR, hex)}
							/>
						</div>
					</Dropdown>
				</div>
				<div className={styles.logo}>
					<div className={styles.safeArea}>
						<Logos />
					</div>
				</div>
			</div>
		);
	};
}

Plot.propTypes = {
	params: PropTypes.object.isRequired,
	handleParam: PropTypes.func.isRequired
};

const PlotWithCalculatorContext = props => (
	<CalculatorContext.Consumer>
		{ctx => (
			<Plot
				{...props}
				params={ctx.params}
				handleParam={(param, value) =>
					ctx.handleParams(params => ({
						...params,
						[param]: value
					}))
				}
			/>
		)}
	</CalculatorContext.Consumer>
);

export default PlotWithCalculatorContext;
