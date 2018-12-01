import React from "react";
import App, { Container } from "next/app";
import { bindNProgress } from "@utils";
// import moment from "moment";

bindNProgress();
// moment.locale("ru");

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
				<Component {...pageProps} />
			</Container>
		);
	}
}

// const enhance = compose(
// 	/** Here global providers */
// );

// export default enhance(MyApp);
export default MyApp;
