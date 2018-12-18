import React from "react";
import { Segment, List } from "semantic-ui-react";
import { CreateNewsContext } from "../../context";

const ErrorBox = () => (
	<CreateNewsContext.Consumer>
		{ctx => {
			if (ctx.creating.typeErrors) {
				return (
					<Segment inverted color="red">
						<List>
							{Object.keys(ctx.creating.typeErrors).map((error, index) => (
								<List.Item key={index}>
									{ctx.creating.typeErrors[error].msg}
								</List.Item>
							))}
						</List>
					</Segment>
				);
			}

			if (ctx.creating.error) {
				return (
					<Segment inverted color="red">
						<p>{ctx.creating.error}</p>
					</Segment>
				);
			}

			return null;
		}}
	</CreateNewsContext.Consumer>
);

export default ErrorBox;
