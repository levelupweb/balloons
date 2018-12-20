import React from "react";
import App, { Container } from "next/app";
import router from "next/router";
import * as utils from "@utils";
import { getDefaultCollections } from "@utils";
import * as Providers from "@providers";
import { FETCH_AUTH, FETCH_UI_ELEMENTS } from "@consts/_fetch";

utils.bindNProgress();

class MyApp extends App {
	static async getInitialProps({ Component, ctx }) {
		const response = {
			user: null,
			token: null,
			axiosInstance: null,
			ui: null,
			uiError: null,
			shouldRemoveToken: false,
			shouldRedirectToAuth: false,
			pageProps: {}
		};

		response.token = await utils.parseToken(ctx.req);
		response.axiosInstance = await utils.createAxios(response.token);

		if (Component.getInitialProps) {
			response.pageProps = await Component.getInitialProps(ctx);
		}

		if (response.token) {
			try {
				const { data } = await utils.fetch(response.axiosInstance, FETCH_AUTH);
				response.user = data;
			} catch (err) {
				response.shouldRemoveToken = true;

				if (Component.requireAuth) {
					response.shouldRedirectToAuth = true;
				}
			}
		} else if (Component.requireAuth) {
			response.shouldRedirectToAuth = true;
		}

		try {
			const { data } = await utils.fetch(
				response.axiosInstance,
				FETCH_UI_ELEMENTS
			);
			response.ui = data;
		} catch (err) {
			response.uiError = await utils.parseError(err);
		}

		return {
			...response
		};
	}

	render() {
		const { Component, ...rest } = this.props;

		if (rest.shouldRedirectToAuth && utils.isBrowser()) {
			router.push("/admin");
			return null;
		}

		return (
			<Container>
				<Providers.AuthProvider
					shouldRemoveToken={rest.shouldRemoveToken}
					user={rest.user}
					token={rest.token}
				>
					<Providers.FetcherProvider
						axiosInstance={utils.createAxios(rest.token)}
					>
						<Providers.UIProvider ui={rest.ui} error={rest.uiError}>
							<Providers.CollectionsProvider
								defaultCollections={getDefaultCollections(rest.pageProps)}
							>
								<Providers.EditProvider>
									<Component {...rest.pageProps} />
								</Providers.EditProvider>
							</Providers.CollectionsProvider>
						</Providers.UIProvider>
					</Providers.FetcherProvider>
				</Providers.AuthProvider>
			</Container>
		);
	}
}

export default MyApp;
