import React from "react";
import PropTypes from "prop-types";
import classes from "classnames";
import { Icon } from "semantic-ui-react";
import styles from "./styles";

class Expander extends React.Component {
	state = {
		isExpanded: false
	};

	handleIsExpanded = isExpanded =>
		this.setState({
			isExpanded
		});

	render = () => {
		const { isExpanded } = this.state;
		const { children, expandable } = this.props;

		if (!expandable) {
			return children;
		}

		return (
			<div
				className={classes(styles.wrapper, { [styles.expanded]: isExpanded })}
			>
				<button
					onClick={() => this.handleIsExpanded(!isExpanded)}
					className={styles.expander}
				>
					<span className={styles.icon}>
						<Icon name="bars" />
					</span>
					Раскрыть меню
				</button>
				{isExpanded && <div className={styles.menu}>{children}</div>}
			</div>
		);
	};
}

Expander.propTypes = {
	children: PropTypes.element.isRequired,
	expandable: PropTypes.bool
};

Expander.defaultProps = {
	expandable: false
};

export default Expander;
