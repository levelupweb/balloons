import React from "react";
import PropTypes from "prop-types";
import ScalableSVG from "@components/ScalableSVG";
import Logos from "../Logos";
import { CalculatorContext } from "../../context";
import styles from "./styles";
import { CALCULATOR_PARAM_COLOR } from "../../consts";

class Plot extends React.Component {
	render = () => {
		const { params } = this.props;

		return (
			<div className={styles.plot}>
				<ScalableSVG
					url={require("../../svg/balloon.svg")}
					fill={params[CALCULATOR_PARAM_COLOR]}
				/>
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
	params: PropTypes.object.isRequired
};

const PlotWithCalculatorContext = props => (
	<CalculatorContext.Consumer>
		{ctx => <Plot {...props} params={ctx.params} />}
	</CalculatorContext.Consumer>
);

export default PlotWithCalculatorContext;
