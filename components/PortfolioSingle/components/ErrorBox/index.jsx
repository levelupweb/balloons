import React from "react";
import { Segment, List } from "semantic-ui-react";
import { PortfolioSingleContext } from "../../context";

const ErrorBox = () => (
	<PortfolioSingleContext.Consumer>
		{ctx => {
			if (ctx.updating.typeErrors) {
				return (
					<Segment inverted color="red">
						<List>
							{Object.keys(ctx.updating.typeErrors).map((error, index) => (
								<List.Item key={index}>
									{ctx.updating.typeErrors[error].msg}
								</List.Item>
							))}
						</List>
					</Segment>
				);
			}

			if (ctx.updating.error) {
				return (
					<Segment inverted color="red">
						<p>{ctx.updating.error}</p>
					</Segment>
				);
			}

			return null;
		}}
	</PortfolioSingleContext.Consumer>
);

export default ErrorBox;
