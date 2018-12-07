import React from "react";
import { SALE_IMAGE } from "@consts/sale";
import { resolveImageUrl } from "@utils";
import { SaleContext } from "../../../../context";
import styles from "./styles";

const ImageWrapper = () => (
	<SaleContext.Consumer>
		{ctx => (
			<div
				className={styles.image}
				style={{
					backgroundImage: `url(${resolveImageUrl(ctx.sale[SALE_IMAGE])}`
				}}
			/>
		)}
	</SaleContext.Consumer>
);

export default ImageWrapper;
