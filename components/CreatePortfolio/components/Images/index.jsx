import React from "react";
import classes from "classnames";
import FileUploader from "@components/FileUploader";
import Masonry from "react-masonry-component";
import ImageZoom from "react-medium-image-zoom";
import { Button } from "semantic-ui-react";
import Icon from "@components/Icon";
import { PORTFOLIO_IMAGES } from "@consts/portfolio";
import { resolveImageUrl } from "@utils";
import { CreatePortfolioContext } from "../../context";
import styles from "./styles";

const Images = () => (
	<CreatePortfolioContext.Consumer>
		{ctx => {
			const images = ctx.data[PORTFOLIO_IMAGES];

			return (
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
						<div className={classes(styles.item, styles.upload)}>
							<FileUploader
								text="Загрузить изображение"
								onUrl={url =>
									ctx.handleData({ [PORTFOLIO_IMAGES]: [url, ...images] })
								}
							/>
						</div>
						{images.map((item, index) => (
							<div className={styles.item} key={index}>
								<div className={styles.remove}>
									<Button
										onClick={() =>
											ctx.handleData({
												[PORTFOLIO_IMAGES]: images.filter((_, i) => i !== index)
											})
										}
										circular
										icon
									>
										<Icon icon="close" size={17} />
									</Button>
								</div>
								<ImageZoom
									image={{
										src: resolveImageUrl(item),
										width: "100%"
									}}
									zoomImage={{
										src: resolveImageUrl(item),
										width: "100%"
									}}
								/>
							</div>
						))}
					</Masonry>
				</div>
			);
		}}
	</CreatePortfolioContext.Consumer>
);

export default Images;
