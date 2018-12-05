import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "next/router";
import { Heading, Paragraph } from "@components/Typography";
import Margin from "@components/Margin";
import Field from "@components/Field";
import Login from "./components/Login";
import ErrorNotification from "./components/ErrorNotification";
import Actions from "./components/Actions";
import Password from "./components/Password";
import { AuthComponentContext, AuthComponentProvider } from "./context";
import styles from "./styles";

class Auth extends React.Component {
	state = {
		redirecting: false
	};

	componentDidMount = () => {
		const { shouldRedirect } = this.props;

		if (shouldRedirect) {
			return this.redirect();
		}
	};

	componentDidUpdate = prevProps => {
		const { shouldRedirect } = this.props;

		if (shouldRedirect !== prevProps.shouldRedirect && shouldRedirect) {
			return this.redirect();
		}
	};

	redirect = () => {
		const { router } = this.props;

		return this.setState(
			{
				redirecting: true
			},
			() => {
				router.push("/");
			}
		);
	};

	render = () => {
		const { redirecting } = this.state;
		const { hasError } = this.props;

		if (redirecting) {
			return <Paragraph>Телепортация на главную..</Paragraph>;
		}

		return (
			<div className={styles.form}>
				<Heading as="h1" size={3}>
					Авторизация
				</Heading>
				<Paragraph>
					Авторизуйтесь в системе для редактирования внутрисайтовых материалов
				</Paragraph>
				{hasError && (
					<Margin top>
						<ErrorNotification />
					</Margin>
				)}
				<Margin top>
					<Field title="Логин">
						<Login />
					</Field>
				</Margin>
				<Margin top>
					<Field title="Пароль">
						<Password />
					</Field>
				</Margin>
				<Margin top>
					<Paragraph>
						При авторизации будут использоваться ваши Cookies-файлы
					</Paragraph>
				</Margin>
				<Margin top>
					<Actions />
				</Margin>
			</div>
		);
	};
}

Auth.propTypes = {
	shouldRedirect: PropTypes.bool.isRequired,
	hasError: PropTypes.bool.isRequired,
	router: PropTypes.object.isRequired
};

const AuthWithProvider = props => (
	<AuthComponentProvider>
		<AuthComponentContext.Consumer>
			{ctx => (
				<Auth
					{...props}
					isHydrating={ctx.isHydrating}
					shouldRedirect={ctx.shouldRedirect}
					hasError={!!ctx.error}
				/>
			)}
		</AuthComponentContext.Consumer>
	</AuthComponentProvider>
);

export default withRouter(AuthWithProvider);
