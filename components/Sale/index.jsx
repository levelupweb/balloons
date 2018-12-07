import React from "react";
import PropTypes from "prop-types";
import { SaleProvider, SaleContext } from "./context";
import SaleViewCard from "./views/Card";
import RemoveModal from "./components/RemoveModal";
import EditModal from "./components/EditModal";
import { SALE_VIEW_CARD } from "./consts";

const Sale = ({ view }) => {
	if (view === SALE_VIEW_CARD) {
		return <SaleViewCard />;
	}

	return null;
};

Sale.propTypes = {
	view: PropTypes.string
};

Sale.defaultProps = {
	view: SALE_VIEW_CARD
};

const SaleWithProvider = props => (
	<SaleProvider sale saleId={props.saleId}>
		<SaleContext.Consumer>
			{ctx => {
				if (!ctx.sale) {
					return null;
				}

				return (
					<React.Fragment>
						{ctx.editable && (
							<React.Fragment>
								<RemoveModal />
								<EditModal />
							</React.Fragment>
						)}
						<Sale />
					</React.Fragment>
				);
			}}
		</SaleContext.Consumer>
	</SaleProvider>
);

SaleWithProvider.propTypes = {
	saleId: PropTypes.string.isRequired
};

export default SaleWithProvider;
