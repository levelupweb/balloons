import React from "react";
import PropTypes from "prop-types";
import { createAxios, parseError, parseToken } from "@utils";
import DefaultContainer from "@containers/Default";
import Portfolio from "@components/Portfolio";
import { getEntries } from "./utils";

class PortfolioPage extends React.Component {
	static async getInitialProps({ req }) {
		const axiosInstance = await createAxios(parseToken(req));

		try {
			const { data } = await getEntries(axiosInstance);

			const response = {
				defaultPortfolio: data.map(item => item._id),
				fetchError: null
			};

			return {
				...response,
				collectionsPortfolio: data // inserting portfolio in collections
			};
		} catch (err) {
			return {
				defaultPortfolio: null,
				fetchError: parseError(err)
			};
		}
	}

	render = () => {
		const { defaultPortfolio, fetchError } = this.props;

		return (
			<DefaultContainer>
				<Portfolio
					defaultPortfolio={defaultPortfolio}
					fetchError={fetchError}
				/>
			</DefaultContainer>
		);
	};
}

PortfolioPage.propTypes = {
	defaultPortfolio: PropTypes.array,
	fetchError: PropTypes.string
};

PortfolioPage.defaultProps = {
	defaultPortfolio: null,
	fetchError: null
};

export default PortfolioPage;
