import React from "react";
import PropTypes from "prop-types";
import classes from "classnames";
import { getStorageUrl } from "@utils";
import { SLIDE_IMAGE_URL } from "@consts/slide";
import { Paragraph } from "@components/Typography";
import { CreateNewSlideContext } from "../../context";
import styles from "./styles";

const Image = ({ image, hasError }) => {
	if (image) {
		return <img src={getStorageUrl(image)} width="100%" />;
	}

	return (
		<div className={classes(styles.noimage, { [styles.error]: hasError })}>
			<Paragraph>Без изображения</Paragraph>
		</div>
	);
};

Image.propTypes = {
	image: PropTypes.string,
	hasError: PropTypes.bool.isRequired
};

Image.defaultProps = {
	image: null
};

const ImageWithCreateNewSlideContext = props => (
	<CreateNewSlideContext.Consumer>
		{ctx => (
			<Image
				{...props}
				hasError={!!ctx.getTypeError(SLIDE_IMAGE_URL)}
				image={ctx.temporarySlide[SLIDE_IMAGE_URL]}
			/>
		)}
	</CreateNewSlideContext.Consumer>
);
export default ImageWithCreateNewSlideContext;
