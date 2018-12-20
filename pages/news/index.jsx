import React from "react";
import PropTypes from "prop-types";
import { createAxios, parseError, parseToken } from "@utils";
import DefaultContainer from "@containers/Default";
import News from "@components/News";
import { getDefaultNews } from "./utils";

class NewsPage extends React.Component {
	static async getInitialProps({ req, query }) {
		const axiosInstance = await createAxios(parseToken(req));

		try {
			const { data } = await getDefaultNews(axiosInstance, query.page);

			const response = {
				defaultNews: data.news.map(news => news._id),
				total: data.total,
				fetchError: null
			};

			return {
				...response,
				collectionsNews: data.news // inserting articles in collections
			};
		} catch (err) {
			return {
				defaultNews: null,
				fetchError: parseError(err)
			};
		}
	}

	render = () => {
		const { defaultNews, fetchError } = this.props;

		return (
			<DefaultContainer>
				<News defaultNews={defaultNews} fetchError={fetchError} />
			</DefaultContainer>
		);
	};
}

NewsPage.propTypes = {
	defaultNews: PropTypes.array,
	fetchError: PropTypes.string
};

NewsPage.defaultProps = {
	defaultNews: null,
	fetchError: null
};

export default NewsPage;
