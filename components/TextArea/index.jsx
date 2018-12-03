import React from "react";
import PropTypes from "prop-types";
import classes from "classnames";
import { Paragraph, Heading } from "@components/Typography";
import Icon from "@components/Icon";
import Margin from "@components/Margin";
import { isFunction } from "@utils";
import styles from "./styles";

class TextArea extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			focused: false,
			displayError: !!this.props.error
		};
		this.textarea = React.createRef();
	}

	componentDidMount = () => {
		const { handleRef, focused } = this.props;

		if (isFunction(handleRef)) {
			handleRef(this.textarea.current);
		}

		if (focused) {
			this.textarea.current.focus();
		}
	};

	componentDidUpdate = prevProps => {
		const { error } = this.props;

		if (prevProps.error !== error) {
			this.setState({
				displayError: !!error
			});
		}
	};

	handleChange = event => {
		const { onChange } = this.props;

		return onChange(event, event.target.value);
	};

	handleFocus = () =>
		this.setState({
			focused: true
		});

	handleBlur = () =>
		this.setState({
			focused: false
		});

	hideError = () =>
		this.setState({
			displayError: false
		});

	render = () => {
		const { focused, displayError } = this.state;

		const {
			error,
			label,
			name,
			value,
			type,
			className,
			style,
			placeholder,
			fluid,
			labelLeft
		} = this.props;

		return (
			<div
				className={classes(
					styles.wrapper,
					{ [styles.focused]: focused },
					{ [styles.fluid]: fluid },
					{ [styles.labelLeft]: labelLeft }
				)}
			>
				<div className={styles.main}>
					{label && (
						<Heading as="label" htmlFor={name} size={5}>
							{label}
						</Heading>
					)}
					<div className={styles.textarea}>
						<textarea
							ref={this.textarea}
							style={style}
							onFocus={this.handleFocus}
							onBlur={this.handleBlur}
							placeholder={placeholder}
							onChange={this.handleChange}
							className={classes(styles.element, className)}
							type={type}
							value={value}
						/>
					</div>
				</div>
				{displayError && error && (
					<Margin top half>
						<div className={styles.error}>
							<Paragraph className={styles.content}>{error}</Paragraph>
							<button onClick={this.hideError} className={styles.close}>
								<Icon icon="close" size={17} />
							</button>
						</div>
					</Margin>
				)}
			</div>
		);
	};
}

TextArea.propTypes = {
	type: PropTypes.string,
	name: PropTypes.string.isRequired,
	label: PropTypes.string,
	focused: PropTypes.bool,
	labelLeft: PropTypes.bool,
	onChange: PropTypes.func.isRequired,
	value: PropTypes.string,
	fluid: PropTypes.bool,
	placeholder: PropTypes.string,
	error: PropTypes.string,
	rows: PropTypes.number,
	className: PropTypes.string,
	style: PropTypes.object,
	handleRef: PropTypes.func
};

TextArea.defaultProps = {
	value: "",
	error: null,
	label: null,
	focused: false,
	labelLeft: false,
	handleRef: null,
	placeholder: null,
	className: null,
	rows: 2,
	style: {},
	fluid: false
};

export default TextArea;
