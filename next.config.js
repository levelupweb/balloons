const withLess = require("@zeit/next-less");
const withCSS = require("@zeit/next-css");
const withBundleAnalyzer = require("@zeit/next-bundle-analyzer");
const composePlugins = require("next-compose");
const aliases = require("./aliases");
const config = require("./config");

module.exports = composePlugins([
	[
		withBundleAnalyzer,
		{
			analyzeServer: ["server", "both"].includes(process.env.BUNDLE_ANALYZE),
			analyzeBrowser: ["browser", "both"].includes(process.env.BUNDLE_ANALYZE),
			bundleAnalyzerConfig: {
				server: {
					analyzerMode: "static",
					reportFilename: "../bundles/server.html"
				},
				browser: {
					analyzerMode: "static",
					reportFilename: "./bundles/client.html"
				}
			}
		}
	],
	[
		withLess,
		{
			cssModules: true,
			cssLoaderOptions: {
				importLoaders: 1,
				localIdentName: "[local]__[hash:base64:5]"
			}
		}
	],
	[withCSS],
	{
		webpack: cfg =>
			Object.assign({}, cfg, {
				module: Object.assign({}, cfg.module, {
					rules: cfg.module.rules.concat({
						test: /\.(jpeg|jpg|png|svg|eot|otf|ttf|woff|woff2)$/,
						use: {
							loader: "file-loader",
							options: {
								limit: 1,
								outputPath: "static/",
								publicPath: `${config[process.env.NODE_ENV].url}/static`,
								name: "[hash:base64:10].[ext]"
							}
						}
					})
				}),
				resolve: Object.assign({}, cfg.resolve, {
					alias: aliases,
					extensions: cfg.resolve.extensions.concat([".less", ".css"])
				})
			})
	}
]);
