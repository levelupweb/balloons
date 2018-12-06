import React from "react";
import PropTypes from "prop-types";
import classes from "classnames";
import Link from "next/link";
import Icon from "@components/Icon";
import Atomic from "../Atomic";
import styles from "./styles";

class Multi extends React.Component {
	state = {
		isExpanded: false
	};

	handleIsExpanded = isExpanded =>
		this.setState({
			isExpanded
		});

	handleMouseEnter = () => {
		const { vertical } = this.props;

		if (vertical) {
			return;
		}

		this.handleIsExpanded(true);
	};

	handleMouseLeave = () => {
		const { vertical } = this.props;

		if (vertical) {
			return;
		}

		this.handleIsExpanded(false);
	};

	handleClick = () => {
		const { vertical } = this.props;
		const { isExpanded } = this.state;

		if (!vertical) {
			return;
		}

		this.handleIsExpanded(!isExpanded);
	};

	mutateSubElement = element => {
		const { rect } = this.props;

		if (!element || !rect) {
			return;
		}

		const elementBounds = element.getBoundingClientRect();

		if (elementBounds.right > rect.right) {
			element.classList.add(styles.reverse);
		}
	};

	render = () => {
		const { vertical, item } = this.props;
		const { isExpanded } = this.state;

		return (
			<Atomic
				onMouseEnter={this.handleMouseEnter}
				onClick={this.handleClick}
				onMouseLeave={this.handleMouseLeave}
				vertical={vertical}
				className={styles.item}
				isExpanded={isExpanded}
			>
				<span
					className={classes(styles.title, { [styles.vertical]: vertical })}
				>
					<span className={styles.text}>{item.title}</span>
					<Icon className={styles.icon} icon="keyboard-arrow-down" size={18} />
				</span>
				{isExpanded && (
					<ul className={styles.sub} ref={this.mutateSubElement}>
						{item.elements.map((el, index) => (
							<Link
								shallow
								key={index}
								href={el.link ? el.link : `/article/${el.slug}`}
							>
								<a>
									<Atomic vertical>
										<span className={styles.inner}>{el.title}</span>
									</Atomic>
								</a>
							</Link>
						))}
					</ul>
				)}
			</Atomic>
		);
	};
}

Multi.propTypes = {
	vertical: PropTypes.bool,
	item: PropTypes.object,
	rect: PropTypes.any
};

Multi.defaultProps = {
	vertical: false,
	rect: null
};

export default Multi;
