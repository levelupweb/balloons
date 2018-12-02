import React from "react";
import PropTypes from "prop-types";
import classes from "classnames";
import Icon from "@components/Icon";
import { Paragraph } from "@components/Typography";
import { variantToStyle } from "./utils";
import styles from "./styles";
import { NOTIFICATION_VARIANT_INFO } from "./consts";

class Notification extends React.Component {
	state = {
		hidden: false
	};

	componentDidUpdate = prevProps => {
		const { content } = this.props;

		if (content !== prevProps.content && content) {
			this.setState({
				hidden: false
			});
		}
	};

	handleHidden = () =>
		this.setState({
			hidden: true
		});

	render = () => {
		const { hidden } = this.state;
		const { content, variant } = this.props;

		if (hidden) {
			return null;
		}

		return (
			<div className={classes(styles.notification, variantToStyle(variant))}>
				<Paragraph className={styles.content}>{content}</Paragraph>
				<button onClick={this.handleHidden} className={styles.close}>
					<Icon icon="close" size={17} />
				</button>
			</div>
		);
	};
}

Notification.propTypes = {
	variant: PropTypes.string,
	content: PropTypes.string.isRequired
};

Notification.defaultProps = {
	variant: NOTIFICATION_VARIANT_INFO
};

export default Notification;
