import React from "react";
import App, { Container } from "next/app";
import { bindNProgress, compose } from "@utils";
import { withFetcher, withAuth, withUi } from "@HOC";
import { EditProvider, CollectionsProvider } from "@providers";
import { getDefaultCollections } from "@utils";

bindNProgress();

class MyApp extends App {
	static async getInitialProps({ Component, ctx }) {
		let pageProps = {};

		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx);
		}

		return {
			pageProps
		};
	}

	render() {
		const { Component, pageProps } = this.props;

		return (
			<Container>
				<CollectionsProvider
					defaultCollections={getDefaultCollections(pageProps)}
				>
					<EditProvider>
						<Component {...pageProps} />
					</EditProvider>
				</CollectionsProvider>
			</Container>
		);
	}
}

const enhance = compose(
	withAuth,
	withFetcher,
	withUi
);

export default enhance(MyApp);
