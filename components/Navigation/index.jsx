import React from "react";
import { withRouter } from "next/router";
import Link from "next/link";
import { Button, Icon } from "semantic-ui-react";
import PropTypes from "prop-types";
import { UIContext } from "@providers";
import Item from "./components/Item";
import styles from "./styles";
import { EditContext } from "../../providers";

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
		const { isEditing } = this.props;

		return (
			<div ref={this.handleWrapper} className={styles.wrapper}>
				<ul className={styles.nav}>{this.renderElements()}</ul>
				{isEditing && (
					<div className={styles.edit}>
						<Link href="/admin/articles">
							<a>
								<Button circular icon>
									<Icon name="settings" />
								</Button>
							</a>
						</Link>
					</div>
				)}
			</div>
		);
	};
}

Navigation.propTypes = {
	router: PropTypes.object.isRequired,
	isEditing: PropTypes.bool.isRequired,
	ui: PropTypes.any.isRequired
};

const NavigationWithUIProvider = props => (
	<UIContext.Consumer>
		{ctx => <Navigation {...props} ui={ctx.ui} />}
	</UIContext.Consumer>
);

const NavigationWithEditContext = props => (
	<EditContext.Consumer>
		{ctx => <NavigationWithUIProvider {...props} isEditing={ctx.isEditing} />}
	</EditContext.Consumer>
);

export default withRouter(NavigationWithEditContext);
