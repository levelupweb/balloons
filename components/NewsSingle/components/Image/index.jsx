import React from "react";
import FileUploader from "@components/FileUploader";
import { NEWS_IMAGE, NEWS_TITLE } from "@consts/news";
import Margin from "@components/Margin";
import { resolveImageUrl } from "@utils";
import { Paragraph } from "@components/Typography";
import { NewsSingleContext } from "../../context";
import styles from "./styles";

const Image = () => (
	<NewsSingleContext.Consumer>
		{ctx => {
			const image = ctx.getField(NEWS_IMAGE);

			if (!ctx.isEditing && !image) {
				return null;
			}

			return (
				<div className={styles.wrapper}>
					<img
						src={resolveImageUrl(image)}
						className={styles.image}
						width="100%"
						alt={ctx.getField(NEWS_TITLE)}
					/>
					{ctx.isEditing && (
						<div className={styles.bar}>
							<Margin bottom className={styles.uploader}>
								<FileUploader
									text={!image ? "Загрузить изображение" : "Загрузить другое"}
									onUrl={url =>
										ctx.handleTemporaryData({
											[NEWS_IMAGE]: url
										})
									}
								/>
							</Margin>

							<Paragraph className={styles.meta}>
								Оптимальный размер - 927px на 400px
							</Paragraph>
						</div>
					)}
				</div>
			);
		}}
	</NewsSingleContext.Consumer>
);

export default Image;
