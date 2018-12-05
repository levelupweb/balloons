import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { Paragraph } from "@components/Typography";
import { formatDate } from "@utils";
import {
	ARTICLE_CATEGORY,
	ARTICLE_TITLE,
	ARTICLE_UPDATED
} from "@consts/article";
import { CATEGORY_TITLE } from "@consts/category";
import styles from "./styles";

const Preview = ({ article }) => (
	<div className={styles.preview}>
		<div className={styles.left}>
			<Link
				href={{
					pathname: "/article",
					query: {
						edit: "true"
					}
				}}
			>
				<a className={styles.title}>{article[ARTICLE_TITLE]}</a>
			</Link>
			{article[ARTICLE_CATEGORY] && (
				<Paragraph className={styles.meta}>
					Из категории: {article[ARTICLE_CATEGORY][CATEGORY_TITLE]}
				</Paragraph>
			)}
		</div>
		<div className={styles.right}>
			<Paragraph className={styles.meta}>
				Последнее обновление: {formatDate(article[ARTICLE_UPDATED])}
			</Paragraph>
		</div>
	</div>
);

Preview.propTypes = {
	article: PropTypes.object.isRequired
};

export default Preview;
