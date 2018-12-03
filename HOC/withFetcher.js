import React from "react";
import { createAxios } from "@utils";
import { TOKEN } from "@consts/_common";
import { FetcherProvider } from "@providers";

export const withFetcher = Component => {
	class AppWithFetcherProvider extends React.Component {
		static async getInitialProps(appContext) {
			let appProps = {};

			const token = appContext.ctx.req && appContext.ctx.req.cookies[TOKEN];

			const axiosInstance = await createAxios(token);

			if (typeof Component.getInitialProps === "function") {
				appProps = await Component.getInitialProps.call(Component, {
					...appContext,
					axiosInstance
				});
			}

			return {
				...appProps,
				axiosInstance,
				token
			};
		}

		render = () => {
			return (
				<FetcherProvider
					axiosInstance={createAxios(this.props.token)}
					token={this.props.token}
				>
					<Component {...this.props} />
				</FetcherProvider>
			);
		};
	}

	return AppWithFetcherProvider;
};

export default withFetcher;
