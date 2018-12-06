import React from "react";
import PropTypes from "prop-types";
import classes from "classnames";
import smoothscroll from "smoothscroll-polyfill";
import { Container } from "semantic-ui-react";
import Header from "@components/Header";
import Footer from "@components/Footer";
import EditorMenu from "@components/EditorMenu";
import { AuthContext } from "@providers";
import Navigation from "@components/Navigation";
import styles from "./styles";

class Default extends React.Component {
	state = {
		cantFit: false
	};

	componentDidMount = () => {
		smoothscroll.polyfill();
	};

	handleCantFit = cantFit =>
		this.setState({
			cantFit
		});

	render = () => {
		const { children, afterNavigation, canEdit, mainClassName } = this.props;
		const { cantFit } = this.state;

		return (
			<div
				id="main-container"
				className={classes(styles.wrapper, {
					[styles.editable]: canEdit
				})}
			>
				<div className={styles.dimmer} />

				{canEdit && (
					<div className={styles.edit}>
						<EditorMenu />
					</div>
				)}
				<header>
					<Container>
						<Header />
					</Container>
				</header>
				<nav className={classes(styles.nav, { [styles.cantFit]: cantFit })}>
					<Container>
						<Navigation onChangeCantFit={this.handleCantFit} />
					</Container>
				</nav>
				{afterNavigation}
				<div className={classes(styles.main, mainClassName)}>
					<Container>{children}</Container>
				</div>
				<footer className={styles.footer}>
					<Container>
						<Footer />
					</Container>
				</footer>
			</div>
		);
	};
}

Default.propTypes = {
	canEdit: PropTypes.bool.isRequired,
	mainClassName: PropTypes.string,
	afterNavigation: PropTypes.element,
	children: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
		.isRequired
};

Default.defaultProps = {
	mainClassName: null,
	afterNavigation: null
};

const DefaultWithAuthContext = props => (
	<AuthContext.Consumer>
		{ctx => <Default {...props} canEdit={!!ctx.user} />}
	</AuthContext.Consumer>
);

export default DefaultWithAuthContext;
