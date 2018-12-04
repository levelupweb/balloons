import React from "react";
import PropTypes from "prop-types";
import classes from "classnames";
import Header from "@components/Header";
import Footer from "@components/Footer";
import EditButton from "@components/EditButton";
import Container from "@components/Container";
import Navigation from "@components/Navigation";
import smoothscroll from "smoothscroll-polyfill";
import styles from "./styles";
import { AuthContext } from "../../providers";

class Default extends React.Component {
	componentDidMount = () => {
		smoothscroll.polyfill();
	};

	render = () => {
		const { children, canEdit, mainClassName } = this.props;
		return (
			<div className={classes(styles.wrapper, { [styles.editable]: canEdit })}>
				{canEdit && (
					<div className={styles.edit}>
						<EditButton />
					</div>
				)}
				<header>
					<Container>
						<Header />
					</Container>
				</header>
				<nav className={styles.nav}>
					<Container>
						<Navigation />
					</Container>
				</nav>
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
	children: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
		.isRequired
};

Default.defaultProps = {
	mainClassName: null
};

const DefaultWithAuthContext = props => (
	<AuthContext.Consumer>
		{ctx => <Default {...props} canEdit={!!ctx.user} />}
	</AuthContext.Consumer>
);

export default DefaultWithAuthContext;
