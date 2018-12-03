import React from "react";
import PropTypes from "prop-types";
import Header from "@components/Header";
import Footer from "@components/Footer";
import EditButton from "@components/EditButton";
import Container from "@components/Container";
import Navigation from "@components/Navigation";
import styles from "./styles";
import { AuthContext } from "../../providers";

const Default = ({ children, canEdit }) => (
	<div className={styles.wrapper}>
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
		<div className={styles.main}>
			<Container>{children}</Container>
		</div>
		<footer className={styles.footer}>
			<Container>
				<Footer />
			</Container>
		</footer>
	</div>
);

Default.propTypes = {
	canEdit: PropTypes.bool.isRequired,
	children: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
		.isRequired
};

const DefaultWithAuthContext = props => (
	<AuthContext.Consumer>
		{ctx => <Default {...props} canEdit={!!ctx.user} />}
	</AuthContext.Consumer>
);

export default DefaultWithAuthContext;
