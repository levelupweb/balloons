import React from "react";
import FileUploader from "@components/FileUploader";
import { NEWS_IMAGE } from "@consts/news";
import Margin from "@components/Margin";
import { getStorageUrl } from "@utils";
import { Paragraph } from "@components/Typography";
import { CreateNewsContext } from "../../context";
import styles from "./styles";

const Image = () => (
	<CreateNewsContext.Consumer>
		{ctx => (
			<div
				className={styles.wrapper}
				style={{
					backgroundImage:
						ctx.data[NEWS_IMAGE] &&
						`url(${getStorageUrl(ctx.data[NEWS_IMAGE])})`
				}}
			>
				<Margin bottom className={styles.uploader}>
					<FileUploader
						text={
							!ctx.data[NEWS_IMAGE]
								? "Загрузить изображение"
								: "Загрузить другое"
						}
						onUrl={url =>
							ctx.handleData({
								[NEWS_IMAGE]: url
							})
						}
					/>
				</Margin>

				<Paragraph className={styles.meta}>
					Оптимальный размер - 927px на 500px
				</Paragraph>
			</div>
		)}
	</CreateNewsContext.Consumer>
);

export default Image;
