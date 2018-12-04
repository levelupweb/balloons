import React from "react";
import { withRouter } from "next/router";
import PropTypes from "prop-types";
import { UIContext } from "@providers";
import Item from "./components/Item";
import styles from "./styles";

class Navigation extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			activeElement: null,
			bounds: null
		};
	}

	isActive = link => {
		const { router } = this.props;

		return router.pathname === link;
	};

	handleActiveElement = element =>
		this.setState({
			activeElement: element
		});

	renderElements = () => {
		const { ui } = this.props;
		const { bounds } = this.state;

		if (!ui || !ui.menu) {
			return;
		}

		return Object.keys(ui.menu).map((item, index) => {
			const value = ui.menu[item];

			return <Item bounds={bounds} item={value} key={index} />;
		});
	};

	handleWrapper = element =>
		element &&
		this.setState({
			bounds: element.getBoundingClientRect()
		});

	render = () => {
		// const { activeElement } = this.state;

		return (
			<div ref={this.handleWrapper} className={styles.wrapper}>
				<ul className={styles.nav}>{this.renderElements()}</ul>
			</div>
		);
	};
}

Navigation.propTypes = {
	router: PropTypes.object.isRequired,
	ui: PropTypes.any.isRequired
};

const NavigationWithUIProvider = props => (
	<UIContext.Consumer>
		{ctx => <Navigation {...props} ui={ctx.ui} />}
	</UIContext.Consumer>
);

export default withRouter(NavigationWithUIProvider);
