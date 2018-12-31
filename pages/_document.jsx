import React from "react";
import Document, { Head, Main, NextScript } from "next/document";
import flush from "styled-jsx/server";
import { getEnvConfig } from "@utils";

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
		const calculatedConfig = getEnvConfig(process.env.NODE_ENV);
		const injectScript = `window.config = ${JSON.stringify(calculatedConfig)}`;
		return (
			<html>
				<script dangerouslySetInnerHTML={{ __html: injectScript }} />

				<Head>
					<link rel="stylesheet" href="/static/normalize.css" />
					<link rel="stylesheet" href="/static/nprogress.css" />
					<link rel="stylesheet" href="/semantic/semantic.min.css" />
					<meta
						name="Description"
						content="Печать на воздушных шарах - логотипы, текст, изображения. Собственное производство."
					/>
					<meta
						name="Keywords"
						content="Печать, шары, печать на шарах, золотая стрекоза, печать логотипа, текст на шаре, изображение на шаре"
					/>
					<meta name="yandex-verification" content="15eb07b5384bb4e1" />
					<link
						rel="shortcut icon"
						href="/static/favicon.ico"
						type="image/x-icon"
					/>
					<link
						href="https://fonts.googleapis.com/css?family=Open+Sans:400,700&amp;subset=cyrillic"
						rel="stylesheet"
					/>
					<link
						href="https://fonts.googleapis.com/css?family=Noto+Sans"
						rel="stylesheet"
					/>
					<meta name="theme-color" content="#ffffff" />
					<meta name="viewport" content="width=device-width, initial-scale=1" />
				</Head>
				<body className="main-body">
					<Main />
					<NextScript />
				</body>
			</html>
		);
	}
}

export default MyDocument;
