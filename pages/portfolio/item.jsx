import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { createAxios, parseError, parseToken } from "@utils";
import DefaultContainer from "@containers/Default";
import { PORTFOLIO_TITLE } from "@consts/portfolio";
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
				title: data[PORTFOLIO_TITLE],
				collectionsPortfolio: [data] // inserting articles in collections
			};
		} catch (err) {
			return {
				defaultEditing,
				title: "Ошибка",
				portfolioId: null,
				fetchError: parseError(err)
			};
		}
	}

	render = () => {
		const { portfolioId, fetchError, title, defaultEditing } = this.props;

		return (
			<DefaultContainer>
				<Head>
					<title>{title} - Золотая стрекоза</title>
				</Head>
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
	title: PropTypes.string.isRequired,
	fetchError: PropTypes.string,
	defaultEditing: PropTypes.bool
};

PortfolioSinglePage.defaultProps = {
	portfolioId: null,
	fetchError: null,
	defaultEditing: false
};

export default PortfolioSinglePage;
