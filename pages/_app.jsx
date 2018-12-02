import React from "react";
import App, { Container } from "next/app";
import { bindNProgress, compose } from "@utils";
import { withFetcher, withAuth } from "@HOC";
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
				<Component {...pageProps} />
			</Container>
		);
	}
}

const enhance = compose(
	withAuth,
	withFetcher
);

export default enhance(MyApp);
