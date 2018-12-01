import React from "react";
import Document, { Head, Main, NextScript } from "next/document";
import flush from "styled-jsx/server";

class MyDocument extends Document {
	static getInitialProps({ renderPage }) {
		const { html, head, errorHtml, chunks } = renderPage();

		const styles = flush();

		return {
			html,
			head,
			errorHtml,
			chunks,
			styles
		};
	}

	render() {
		return (
			<html>
				<Head>
					<link rel="stylesheet" href="/static/normalize.css" />
					<link rel="stylesheet" href="/static/nprogress.css" />
					<link
						href="https://fonts.googleapis.com/css?family=Open+Sans:400,700&amp;subset=cyrillic"
						rel="stylesheet"
					/>
					<meta name="theme-color" content="#ffffff" />
					<meta name="viewport" content="width=device-width, initial-scale=1" />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</html>
		);
	}
}

export default MyDocument;
