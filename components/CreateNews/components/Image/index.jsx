import React from "react";
import FileUploader from "@components/FileUploader";
import { NEWS_IMAGE, NEWS_TITLE } from "@consts/news";
import Margin from "@components/Margin";
import { getStorageUrl } from "@utils";
import { Paragraph } from "@components/Typography";
import { CreateNewsContext } from "../../context";
import styles from "./styles";

const Image = () => (
	<CreateNewsContext.Consumer>
		{ctx => {
			const image = ctx.data[NEWS_IMAGE];
			const title = ctx.data[NEWS_TITLE];

			return (
				<div className={styles.wrapper}>
					{image && (
						<img
							src={getStorageUrl(image)}
							className={styles.image}
							alt={title}
						/>
					)}
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
				</div>
			);
		}}
	</CreateNewsContext.Consumer>
);

export default Image;
