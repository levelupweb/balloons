import React from "react";
import PropTypes from "prop-types";
import Icon from "@components/Icon";
import Link from "next/link";
import classes from "classnames";
import styles from "./styles";

class Item extends React.Component {
	state = {
		isFocused: false
	};

	handleFocused = focused => {
		const { item } = this.props;

		if (!item.elements) {
			return;
		}

		return this.setState({
			isFocused: focused
		});
	};

	mutateSubElement = element => {
		const { bounds } = this.props;

		if (!element) {
			return;
		}

		const elementBounds = element.getBoundingClientRect();

		if (elementBounds.right > bounds.right) {
			element.classList.add(styles.reverse);
		}
	};

	render = () => {
		const { isFocused } = this.state;
		const { item } = this.props;

		if (item.elements) {
			return (
				<li
					onMouseEnter={() => this.handleFocused(true)}
					onMouseLeave={() => this.handleFocused(false)}
					className={classes(styles.item, styles.drop, {
						[styles.focused]: isFocused
					})}
				>
					<span className={styles.wrapper}>
						<span className={styles.title}>
							{item.title}
							<Icon
								className={styles.icon}
								icon="keyboard-arrow-down"
								size={18}
							/>
						</span>
					</span>
					{isFocused && (
						<ul className={styles.sub} ref={this.mutateSubElement}>
							{item.elements.map((el, index) => (
								<li key={index} className={styles.item}>
									<span className={styles.inner}>
										<Link href={`/article/${el.slug}`}>
											<a>{el.title}</a>
										</Link>
									</span>
								</li>
							))}
						</ul>
					)}
				</li>
			);
		}

		return (
			<li className={styles.item}>
				<span className={styles.wrapper}>
					<span className={styles.title}>
						<Link href={`/article/${item.slug}`}>
							<a>{item.title}</a>
						</Link>
					</span>
				</span>
			</li>
		);
	};
}

Item.propTypes = {
	item: PropTypes.object.isRequired,
	bounds: PropTypes.object
};

Item.defaultProps = {
	bounds: null
};

export default Item;
