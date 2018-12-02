import React from "react";
import { FetcherProvider } from "@providers";

export const withFetcher = Component => {
	class AppWithFetcherProvider extends React.Component {
		static async getInitialProps(appContext) {
			let appProps = {};

			if (typeof Component.getInitialProps === "function") {
				appProps = await Component.getInitialProps.call(Component, {
					...appContext
				});
			}

			const token = appContext.ctx.req && appContext.ctx.req.cookies.token;

			return {
				...appProps,
				token
			};
		}

		render = () => {
			const { token, ...rest } = this.props;
			return (
				<FetcherProvider token={token}>
					<Component {...rest} />
				</FetcherProvider>
			);
		};
	}

	return AppWithFetcherProvider;
};

export default withFetcher;
