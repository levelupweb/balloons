import React from "react";
import App, { Container } from "next/app";
import { bindNProgress, compose } from "@utils";
import { withFetcher, withAuth, withUi } from "@HOC";
import { EditProvider } from "@providers";
// import moment from "moment";

bindNProgress();
// moment.locale("ru");

class MyApp extends App {
	static async getInitialProps({ Component, ctx }) {
		let pageProps = {};

		// console.log(ctx);

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
				<EditProvider>
					<Component {...pageProps} />
				</EditProvider>
			</Container>
		);
	}
}

const enhance = compose(
	withFetcher,
	withAuth,
	withUi
);

export default enhance(MyApp);
