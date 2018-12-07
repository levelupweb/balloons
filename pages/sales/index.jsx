import React from "react";
import PropTypes from "prop-types";
import { createAxios, parseError, parseToken, fetch } from "@utils";
import DefaultContainer from "@containers/Default";
import Sales from "@components/Sales";
import { FETCH_SALES_ENTRIES } from "@consts/_fetch";

class SalesPage extends React.Component {
	static async getInitialProps({ req }) {
		const axiosInstance = await createAxios(parseToken(req));

		try {
			const sales = await fetch(axiosInstance, FETCH_SALES_ENTRIES);

			return {
				salesIds: sales.data.map(sale => sale._id),
				collectionsSales: sales.data, // inserting sales in collections
				error: null
			};
		} catch (err) {
			return {
				salesIds: null,
				error: parseError(err)
			};
		}
	}

	render = () => {
		const { salesIds, error } = this.props;

		return (
			<DefaultContainer>
				<Sales salesIds={salesIds} error={error} />
			</DefaultContainer>
		);
	};
}

SalesPage.propTypes = {
	salesIds: PropTypes.arrayOf(PropTypes.string),
	error: PropTypes.string
};

SalesPage.defaultProps = {
	sales: null,
	error: null
};

export default SalesPage;
