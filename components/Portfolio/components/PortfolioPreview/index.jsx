import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { Card, Button } from "semantic-ui-react";
import { resolveImageUrl } from "@utils";
import * as portfolioConsts from "@consts/portfolio";
import styles from "./styles";

const PortfolioPreview = ({ portfolio, editable }) => (
	<Link
		href={{
			pathname: "/portfolio/item",
			query: {
				id: portfolio._id
			}
		}}
	>
		<Card link className={styles.card}>
			<div className={styles.image}>
				<div
					className={styles.image}
					style={{
						backgroundImage: `url(${resolveImageUrl(
							portfolio[portfolioConsts.PORTFOLIO_IMAGES][0]
						)}`
					}}
				/>
				{editable && (
					<div className={styles.menu}>
						<Link
							href={{
								pathname: "/portfolio/item",
								query: {
									id: portfolio._id,
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
				description={portfolio[portfolioConsts.PORTFOLIO_DESCRIPTION]}
				header={portfolio[portfolioConsts.PORTFOLIO_TITLE]}
			/>
		</Card>
	</Link>
);

PortfolioPreview.propTypes = {
	portfolio: PropTypes.object.isRequired,
	editable: PropTypes.bool.isRequired
};

export default PortfolioPreview;
