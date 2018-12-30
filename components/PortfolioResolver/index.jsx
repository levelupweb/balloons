import React from "react";
import PropTypes from "prop-types";
import { PORTFOLIO_MODEL } from "@consts/_models";
import { CollectionsContext, AuthContext } from "@providers";

const PortfolioResolver = ({ portfolioId, children }) => (
	<AuthContext.Consumer>
		{auth => (
			<CollectionsContext.Consumer>
				{ctx => {
					const item = ctx.getEntity(PORTFOLIO_MODEL, portfolioId);
					return item && children(item, !!auth.user);
				}}
			</CollectionsContext.Consumer>
		)}
	</AuthContext.Consumer>
);

PortfolioResolver.propTypes = {
	portfolioId: PropTypes.string.isRequired,
	children: PropTypes.func.isRequired
};

export default PortfolioResolver;
