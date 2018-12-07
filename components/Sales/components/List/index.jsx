import React from "react";
import PropTypes from "prop-types";
import { SALE_VIEW_CARD } from "@components/Sale/consts";
import { Card } from "semantic-ui-react";
import Sale from "@components/Sale";
import { SalesContext } from "../../context";

const List = ({ salesIds }) => (
	<Card.Group itemsPerRow={3}>
		{salesIds.map((saleId, index) => (
			<Sale key={index} view={SALE_VIEW_CARD} saleId={saleId} />
		))}
	</Card.Group>
);

List.propTypes = {
	salesIds: PropTypes.arrayOf(PropTypes.string).isRequired
};

const ListWithSalesContext = props => (
	<SalesContext.Consumer>
		{ctx => <List {...props} salesIds={ctx.salesIds} />}
	</SalesContext.Consumer>
);

export default ListWithSalesContext;
