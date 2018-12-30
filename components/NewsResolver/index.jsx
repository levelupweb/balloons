import React from "react";
import PropTypes from "prop-types";
import { NEWS_MODEL } from "@consts/_models";
import { CollectionsContext, AuthContext } from "@providers";

const NewsResolver = ({ newsId, children }) => (
	<AuthContext.Consumer>
		{auth => (
			<CollectionsContext.Consumer>
				{ctx => {
					const item = ctx.getEntity(NEWS_MODEL, newsId);
					return item && children(item, !!auth.user);
				}}
			</CollectionsContext.Consumer>
		)}
	</AuthContext.Consumer>
);

NewsResolver.propTypes = {
	newsId: PropTypes.string.isRequired,
	children: PropTypes.func.isRequired
};

export default NewsResolver;
