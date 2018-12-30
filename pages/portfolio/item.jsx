import React from "react";
import PropTypes from "prop-types";
import { createAxios, parseError, parseToken } from "@utils";
import DefaultContainer from "@containers/Default";
import PortfolioSingle from "@components/PortfolioSingle";
import { getEntry, isEditing } from "./utils";

class PortfolioSinglePage extends React.Component {
	static async getInitialProps({ req, query }) {
		const axiosInstance = await createAxios(parseToken(req));
		const defaultEditing = isEditing(query.edit);

		try {
			const { data } = await getEntry(axiosInstance, query.id);

			const response = {
				portfolioId: data._id,
				fetchError: null,
				defaultEditing
			};

			return {
				...response,
				collectionsPortfolio: [data] // inserting articles in collections
			};
		} catch (err) {
			return {
				defaultEditing,
				portfolioId: null,
				fetchError: parseError(err)
			};
		}
	}

	render = () => {
		const { portfolioId, fetchError, defaultEditing } = this.props;

		return (
			<DefaultContainer>
				<PortfolioSingle
					defaultEditing={defaultEditing}
					portfolioId={portfolioId}
					fetchError={fetchError}
				/>
			</DefaultContainer>
		);
	};
}

PortfolioSinglePage.propTypes = {
	portfolioId: PropTypes.string,
	fetchError: PropTypes.string,
	defaultEditing: PropTypes.bool
};

PortfolioSinglePage.defaultProps = {
	portfolioId: null,
	fetchError: null,
	defaultEditing: false
};

export default PortfolioSinglePage;
