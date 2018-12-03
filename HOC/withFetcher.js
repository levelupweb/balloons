import React from "react";
import { getApiUrl } from "@utils";
import axios from "axios";
import cookies from "js-cookie";
import { TOKEN } from "@consts/_common";
import { FetcherProvider } from "@providers";

export const withFetcher = Component => {
	class AppWithFetcherProvider extends React.Component {
		static async getInitialProps(appContext) {
			let appProps = {};

			const token = appContext.ctx.req && appContext.ctx.req.cookies[TOKEN];

			if (typeof Component.getInitialProps === "function") {
				appProps = await Component.getInitialProps.call(Component, {
					...appContext,
					axiosInstance: axios.create({
						baseURL: getApiUrl(),
						headers: { authorization: token || cookies.get(TOKEN) }
					})
				});
			}

			return {
				...appProps,
				token
			};
		}

		render = () => {
			const { token, axiosInstance, ...rest } = this.props;
			return (
				<FetcherProvider axiosInstance={axiosInstance} token={token}>
					<Component {...rest} />
				</FetcherProvider>
			);
		};
	}

	return AppWithFetcherProvider;
};

export default withFetcher;
