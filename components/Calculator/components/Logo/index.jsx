import React from "react";
import PropTypes from "prop-types";
import ScalableSVG from "@components/ScalableSVG";
import { Paragraph } from "@components/Typography";
import { getStorageUrl } from "@utils";
import Uploader from "../Uploader";
import styles from "./styles";

class Logo extends React.Component {
	state = { currentIndex: 0 };

	handleIndex = index => this.setState({ currentIndex: index });

	render = () => {
		const { colors, index, logo, handleLogo, mime } = this.props;
		const { currentIndex } = this.state;

		if (!logo) {
			return (
				<div className={styles.centered}>
					<Uploader index={index} onUpload={handleLogo} />
					<Paragraph className={styles.meta}>Форматы .svg, .png</Paragraph>
				</div>
			);
		}

		return (
			<div className={styles.logo}>
				{mime === "image/svg+xml" ? (
					<ScalableSVG url={getStorageUrl(logo)} fill={colors[currentIndex]} />
				) : (
					<img
						className={styles.png}
						src={getStorageUrl(logo)}
						title="Загруженное вами лого"
					/>
				)}
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
	handleLogo: PropTypes.func.isRequired,
	mime: PropTypes.string.isRequired
};

export default Logo;
