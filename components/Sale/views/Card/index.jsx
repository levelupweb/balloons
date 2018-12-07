import React from "react";
import PropTypes from "prop-types";
import { SALE_TITLE, SALE_DESCRIPTION, SALE_DISCOUNT } from "@consts/sale";
import { Card } from "semantic-ui-react";
import Image from "./components/Image";
import Label from "./components/Label";
import EditBar from "./components/EditBar";

import { SaleContext } from "../../context";
import styles from "./styles";

const SaleViewCard = ({ editable, sale }) =>
	sale && (
		<Card className={styles.card}>
			<div className={styles.image}>
				{editable && (
					<div className={styles.editBar}>
						<EditBar />
					</div>
				)}
				<Image />
				{sale[SALE_DISCOUNT] && (
					<div className={styles.label}>
						<Label />
					</div>
				)}
			</div>
			<Card.Content
				description={sale[SALE_DESCRIPTION]}
				header={sale[SALE_TITLE]}
			/>
		</Card>
	);

SaleViewCard.propTypes = {
	editable: PropTypes.bool.isRequired,
	sale: PropTypes
};

const SaleViewCardWithSaleContext = props => (
	<SaleContext.Consumer>
		{ctx => <SaleViewCard {...props} editable={ctx.editable} sale={ctx.sale} />}
	</SaleContext.Consumer>
);

export default SaleViewCardWithSaleContext;
