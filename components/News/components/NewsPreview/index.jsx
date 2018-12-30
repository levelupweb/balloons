import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { Card, Button } from "semantic-ui-react";
import { resolveImageUrl } from "@utils";
import * as newsConsts from "@consts/news";
import styles from "./styles";

const NewsPreview = ({ news, editable }) => (
	<Link
		href={{
			pathname: "/news/item",
			query: {
				id: news._id
			}
		}}
	>
		<Card link className={styles.card}>
			<div className={styles.image}>
				<div
					className={styles.image}
					style={{
						backgroundImage: `url(${resolveImageUrl(
							news[newsConsts.NEWS_IMAGE]
						)}`
					}}
				/>
				{editable && (
					<div className={styles.menu}>
						<Link
							href={{
								pathname: "/news/item",
								query: {
									id: news._id,
									edit: 1
								}
							}}
						>
							<a>
								<Button circular>Редактировать</Button>
							</a>
						</Link>
					</div>
				)}
			</div>
			<Card.Content
				description={news[newsConsts.NEWS_DESCRIPTION]}
				header={news[newsConsts.NEWS_TITLE]}
			/>
		</Card>
	</Link>
);

NewsPreview.propTypes = {
	news: PropTypes.object.isRequired,
	editable: PropTypes.bool.isRequired
};

export default NewsPreview;
