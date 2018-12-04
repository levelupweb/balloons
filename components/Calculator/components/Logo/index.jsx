import React from "react";
import PropTypes from "prop-types";
import ScalableSVG from "@components/ScalableSVG";
import { getStorageUrl } from "@utils";
import Uploader from "../Uploader";
import styles from "./styles";

class Logo extends React.Component {
	state = { currentIndex: 0 };

	handleIndex = index => this.setState({ currentIndex: index });

	render = () => {
		const { colors, index, logo, handleLogo } = this.props;
		const { currentIndex } = this.state;

		if (!logo) {
			return <Uploader index={index} onUpload={handleLogo} />;
		}

		return (
			<div className={styles.logo}>
				<ScalableSVG url={getStorageUrl(logo)} fill={colors[currentIndex]} />
				<div className={styles.uploader}>
					<Uploader index={index} onUpload={handleLogo} />
				</div>
			</div>
		);
	};
}

Logo.propTypes = {
	colors: PropTypes.array.isRequired,
	logo: PropTypes.string,
	index: PropTypes.number.isRequired,
	handleLogo: PropTypes.func.isRequired
};

export default Logo;
