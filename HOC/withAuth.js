import React from "react";
import { AuthProvider } from "@providers";

export const withAuth = Component => {
	class AppWithAuthProvider extends React.Component {
		static async getInitialProps(appContext) {
			let appProps = {};

			if (typeof Component.getInitialProps === "function") {
				appProps = await Component.getInitialProps.call(Component, {
					...appContext
				});
			}

			const token = appContext.ctx.req && appContext.ctx.req.cookies.token;

			return {
				...appProps,
				token
			};
		}

		render = () => {
			const { token, ...rest } = this.props;
			return (
				<AuthProvider token={token}>
					<Component {...rest} />
				</AuthProvider>
			);
		};
	}

	return AppWithAuthProvider;
};

export default withAuth;
