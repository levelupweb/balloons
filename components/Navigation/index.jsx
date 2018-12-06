import React from "react";
import classes from "classnames";
import PropTypes from "prop-types";
import { withRouter } from "next/router";
import { deepEqual, isFunction } from "@utils";
import { debounce } from "throttle-debounce";
import Link from "next/link";
import { Button, Icon } from "semantic-ui-react";
import { UIContext, EditContext } from "@providers";
import Items from "./components/Items";
import Expander from "./components/Expander";
import styles from "./styles";

class Navigation extends React.Component {
	constructor(props) {
		super(props);

		this.debounceVerifyIsFitted = debounce(50, this.verifyIsElementsFitting);
		this.list = React.createRef();

		this.state = {
			activeElement: null,
			cantFit: false,
			rect: null
		};
	}

	componentDidMount = () => {
		this.verifyIsElementsFitting();
		window.addEventListener("resize", this.debounceVerifyIsFitted);
	};

	componentWillUnmount = () => {
		window.removeEventListener("resize", this.debounceVerifyIsFitted);
	};

	shouldComponentUpdate = (_, prevState) => !deepEqual(prevState, this.state);

	verifyIsElementsFitting = () => {
		const { onChangeCantFit } = this.props;

		if (!this.list || !this.list.current) {
			return;
		}

		const width = this.list.current.offsetWidth;
		const cantFit = width > document.body.clientWidth - 40;

		this.setState(
			{
				cantFit
			},
			() => isFunction(onChangeCantFit) && onChangeCantFit(cantFit)
		);
	};

	isActive = link => this.props.router.pathname === link;

	handleActiveElement = element =>
		this.setState({
			activeElement: element
		});

	isUiReady = () => this.props.ui && this.props.ui.menu;

	handleWrapper = wrapper =>
		this.setState({
			wrapper
		});

	getWrapperRect = () => {
		const { wrapper } = this.state;

		return wrapper && wrapper.getBoundingClientRect();
	};

	render = () => {
		const { isEditing, ui } = this.props;
		const { cantFit } = this.state;

		if (!this.isUiReady()) {
			return null;
		}

		return (
			<div ref={this.handleWrapper} className={styles.wrapper}>
				<div
					ref={this.list}
					className={classes(styles.nav, { [styles.cantFit]: cantFit })}
				>
					<Expander expandable={cantFit}>
						<Items
							vertical={cantFit}
							rect={this.getWrapperRect()}
							items={ui.menu}
						/>
					</Expander>
				</div>
				{isEditing && (
					<div className={styles.edit}>
						<Link href="/admin/articles">
							<a>
								<Button inverted circular icon>
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
	ui: PropTypes.any.isRequired,
	onChangeCantFit: PropTypes.func
};

Navigation.defaultProps = {
	onChangeCantFit: null
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
