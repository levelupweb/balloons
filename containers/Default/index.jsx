import React from "react";
import PropTypes from "prop-types";
import Header from "@components/Header";
import Footer from "@components/Footer";
import Container from "@components/Container";
import Navigation from "@components/Navigation";
import styles from "./styles";

const Default = ({ children }) => (
	<Container>
		<div className={styles.wrapper}>
			<header>
				<Header />
			</header>
			<nav>
				<Navigation />
			</nav>
			<div className={styles.main}>{children}</div>
			<footer className={styles.footer}>
				<Footer />
			</footer>
		</div>
	</Container>
);

Default.propTypes = {
	children: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
		.isRequired
};

export default Default;
