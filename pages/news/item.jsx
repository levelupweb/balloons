import React from "react";
import PropTypes from "prop-types";
import { createAxios, parseError, parseToken } from "@utils";
import DefaultContainer from "@containers/Default";
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
				otherIds: data.other.map(item => item._id),
				fetchError: null,
				defaultEditing
			};

			return {
				...response,
				collectionsNews: [data.current, ...data.other] // inserting articles in collections
			};
		} catch (err) {
			return {
				defaultEditing,
				newsId: null,
				otherIds: null,
				fetchError: parseError(err)
			};
		}
	}

	render = () => {
		const { newsId, otherIds, fetchError, defaultEditing } = this.props;

		return (
			<DefaultContainer>
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
