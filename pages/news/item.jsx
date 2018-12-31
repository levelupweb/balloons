import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { createAxios, parseError, parseToken } from "@utils";
import DefaultContainer from "@containers/Default";
import { NEWS_TITLE } from "@consts/news";
import NewsSingle from "@components/NewsSingle";
import { getEntry, isEditing } from "./utils";

class NewsSinglePage extends React.Component {
	static async getInitialProps({ req, query }) {
		const axiosInstance = await createAxios(parseToken(req));
		const defaultEditing = isEditing(query.edit);

		try {
			const { data } = await getEntry(axiosInstance, query.id);

			const response = {
				newsId: data.current._id,
				title: data.current[NEWS_TITLE],
				otherIds: data.other.map(item => item._id),
				fetchError: null,
				defaultEditing
			};

			return {
				...response,
				title: data.current[NEWS_TITLE],
				collectionsNews: [data.current, ...data.other] // inserting articles in collections
			};
		} catch (err) {
			return {
				defaultEditing,
				newsId: null,
				otherIds: null,
				fetchError: parseError(err),
				title: "Ошибка"
			};
		}
	}

	render = () => {
		const { newsId, otherIds, fetchError, defaultEditing, title } = this.props;

		return (
			<DefaultContainer>
				<Head>
					<title>{title} - Золотая стрекоза</title>
				</Head>
				<NewsSingle
					defaultEditing={defaultEditing}
					newsId={newsId}
					otherIds={otherIds}
					fetchError={fetchError}
				/>
			</DefaultContainer>
		);
	};
}

NewsSinglePage.propTypes = {
	newsId: PropTypes.string,
	title: PropTypes.string.isRequired,
	fetchError: PropTypes.string,
	defaultEditing: PropTypes.bool,
	otherIds: PropTypes.array
};

NewsSinglePage.defaultProps = {
	newsId: null,
	otherIds: null,
	fetchError: null,
	defaultEditing: false
};

export default NewsSinglePage;
