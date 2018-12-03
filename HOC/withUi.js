import React from "react";
import { UIProvider } from "@providers";
import { FETCH_UI_ELEMENTS } from "@consts/_fetch";
import { parseError, fetch } from "@utils";

export const withUi = Component => {
	class AppWithUIProvider extends React.Component {
		static async getInitialProps(appContext) {
			let appProps = {};

			if (typeof Component.getInitialProps === "function") {
				appProps = await Component.getInitialProps.call(Component, {
					...appContext
				});
			}

			try {
				const { data } = await fetch(
					appContext.axiosInstance,
					FETCH_UI_ELEMENTS
				);

				if (data) {
					return {
						...appProps,
						ui: data,
						error: null
					};
				}

				throw "Не удалось загрузить страницу";
			} catch (err) {
				return {
					...appProps,
					ui: null,
					error: parseError(err)
				};
			}
		}

		render = () => {
			const { ui, error, ...rest } = this.props;
			return (
				<UIProvider error={error} ui={ui}>
					<Component {...rest} />
				</UIProvider>
			);
		};
	}

	return AppWithUIProvider;
};

export default withUi;
