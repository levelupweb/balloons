import React from "react";
import PropTypes from "prop-types";
import Header from "@components/Header";
import Footer from "@components/Footer";
import Container from "@components/Container";
// import Navigation from "@components/Navigation";
import styles from "./styles";

const Default = ({ children }) => (
	<div className={styles.wrapper}>
		<header>
			<Container>
				<Header />
			</Container>
		</header>
		<nav className={styles.nav}>
			<Container>{/* <Navigation /> */}</Container>
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
	children: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
		.isRequired
};

export default Default;
