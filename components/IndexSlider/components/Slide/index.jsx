import React from "react";
import PropTypes from "prop-types";
import { Heading, Paragraph } from "@components/Typography";
import { getStorageUrl } from "@utils";
import { CollectionsContext } from "@providers";
import { SLIDE_MODEL } from "@consts/_models";
import { SLIDE_IMAGE_URL, SLIDE_TITLE, SLIDE_DESCRIPTION } from "@consts/slide";
import styles from "./styles";

const Slide = ({ slide }) =>
	slide && (
		<div
			className={styles.slide}
			style={{
				backgroundImage: `url("${getStorageUrl(slide[SLIDE_IMAGE_URL])}")`
			}}
		>
			<Heading as="h2" className={styles.title}>
				{slide[SLIDE_TITLE]}
			</Heading>
			<Paragraph lead className={styles.description}>
				{slide[SLIDE_DESCRIPTION]}
			</Paragraph>
		</div>
	);

Slide.propTypes = {
	slide: PropTypes.object.isRequired
};

const SlideWithCollectionsContext = props => (
	<CollectionsContext.Consumer>
		{ctx => (
			<Slide {...props} slide={ctx.getEntity(SLIDE_MODEL, props.slideId)} />
		)}
	</CollectionsContext.Consumer>
);

SlideWithCollectionsContext.propTypes = {
	slideId: PropTypes.string.isRequired
};

export default SlideWithCollectionsContext;
