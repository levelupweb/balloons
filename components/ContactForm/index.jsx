import React from "react";
import PropTypes from "prop-types";
import { withAsyncSetState, fetch, parseError } from "@utils";
import { Paragraph, Heading } from "@components/Typography";
import Field from "@components/Field";
import { FetcherContext } from "@providers/fetcher";
import { FETCH_CONTACT_US } from "@consts/_fetch";
import Margin from "@components/Margin";

import {
	CONTACT_AGREEMENT,
	CONTACT_NAME,
	CONTACT_PHONE,
	CONTACT_MESSAGE
} from "@consts/contact";

import {
	Form,
	Input,
	TextArea,
	Segment,
	Popup,
	Grid,
	Checkbox
} from "semantic-ui-react";

import styles from "./styles";

const defaultMessage = {
	[CONTACT_MESSAGE]: "",
	[CONTACT_NAME]: "",
	[CONTACT_PHONE]: "",
	[CONTACT_AGREEMENT]: false
};

class ContactForm extends React.Component {
	state = {
		data: defaultMessage,
		isHydrating: false,
		isSuccess: false,
		error: null,
		typeErrors: null
	};

	handleData = data =>
		this.asyncSetState({
			data: {
				...this.state.data,
				...data
			}
		});

	sendDataStart = () =>
		this.asyncSetState({
			isHydrating: true,
			isSuccess: false,
			error: null,
			typeErrors: null
		})
			.then(this.sendDataProcess)
			.then(this.sendDataSuccess)
			.catch(this.sendDataFail);

	sendDataProcess = () => {
		const { fetcher } = this.props;
		const { data } = this.state;

		return fetch(fetcher, FETCH_CONTACT_US, data);
	};

	sendDataSuccess = () =>
		this.asyncSetState({
			data: defaultMessage,
			isHydrating: false,
			isSuccess: true
		});

	sendDataFail = reason => {
		const error = parseError(reason);

		if (typeof error === "string") {
			return this.asyncSetState({
				error,
				isHydrating: false
			});
		}

		return this.asyncSetState({
			typeErrors: error,
			isHydrating: false
		});
	};

	getTypeError = field => {
		const { typeErrors } = this.state;

		return typeErrors && typeErrors[field] && typeErrors[field].msg;
	};

	dismissErrors = () =>
		this.asyncSetState({
			error: null,
			typeErrors: null
		});

	render = () => {
		const { error, data, isHydrating, isSuccess } = this.state;

		return (
			<div className={styles.form}>
				<Margin top>
					<Form onSubmit={this.sendDataStart} inverted loading={isHydrating}>
						<Grid stackable>
							<Grid.Row>
								<Grid.Column width={16}>
									<Heading as="h2" size={2}>
										Отправьте нам сообщение
									</Heading>
									<Margin top half>
										<Paragraph>
											Отправьте нам ваше сообщение, чтобы мы могли получить вашу
											обратную связь
										</Paragraph>
									</Margin>
									{isSuccess && (
										<Segment inverted color="green">
											Ваше сообщение успешно доставлено!
										</Segment>
									)}
									{error && (
										<Segment inverted color="red">
											{error}
										</Segment>
									)}
								</Grid.Column>
							</Grid.Row>
							<Grid.Row>
								<Grid.Column width={8}>
									<Field title="Ваше имя">
										<Popup
											open={!!this.getTypeError(CONTACT_NAME)}
											trigger={
												<Input
													error={!!this.getTypeError(CONTACT_NAME)}
													value={data[CONTACT_NAME]}
													onChange={(_, { value }) =>
														this.handleData({
															[CONTACT_NAME]: value
														})
													}
													fluid
													placeholder="Иван Иванов"
												/>
											}
										>
											{this.getTypeError(CONTACT_NAME)}
										</Popup>
									</Field>
								</Grid.Column>
								<Grid.Column width={8}>
									<Field title="Номер телефона">
										<Popup
											open={!!this.getTypeError(CONTACT_PHONE)}
											trigger={
												<Input
													error={!!this.getTypeError(CONTACT_NAME)}
													value={data[CONTACT_PHONE]}
													onChange={(_, { value }) =>
														this.handleData({
															[CONTACT_PHONE]: value
														})
													}
													fluid
													placeholder="+7"
												/>
											}
										>
											{this.getTypeError(CONTACT_PHONE)}
										</Popup>
									</Field>
								</Grid.Column>
							</Grid.Row>
							<Grid.Row>
								<Grid.Column width={16}>
									<Field title="Ваше сообщение">
										<Popup
											open={!!this.getTypeError(CONTACT_MESSAGE)}
											trigger={
												<TextArea
													error={!!this.getTypeError(CONTACT_MESSAGE)}
													value={data[CONTACT_MESSAGE]}
													onChange={(_, { value }) =>
														this.handleData({
															[CONTACT_MESSAGE]: value
														})
													}
													autoHeight
													rows={2}
													placeholder="Начните с приветствия.."
												/>
											}
										>
											{this.getTypeError(CONTACT_MESSAGE)}
										</Popup>
									</Field>
								</Grid.Column>
							</Grid.Row>
							<Grid.Row>
								<Grid.Column width={16}>
									<div className={styles.action}>
										<Form.Button
											className={styles.button}
											loading={isHydrating}
										>
											Отправить
										</Form.Button>
										<Popup
											open={!!this.getTypeError(CONTACT_AGREEMENT)}
											position="bottom left"
											trigger={
												<Checkbox
													inverted
													error={!!this.getTypeError(CONTACT_AGREEMENT)}
													label="Я соглашаюсь с правилами обработки данных"
													checked={data[CONTACT_AGREEMENT]}
													onChange={(_, { checked }) =>
														this.handleData({
															[CONTACT_AGREEMENT]: checked
														})
													}
												/>
											}
										>
											{this.getTypeError(CONTACT_AGREEMENT)}
										</Popup>
									</div>
								</Grid.Column>
							</Grid.Row>
						</Grid>
					</Form>
				</Margin>
			</div>
		);
	};
}

ContactForm.propTypes = {
	fetcher: PropTypes.func.isRequired
};

const ContactFormWithAsyncSetState = withAsyncSetState(ContactForm);

const ContactFormWithFetcherContext = props => (
	<FetcherContext.Consumer>
		{ctx => <ContactFormWithAsyncSetState {...props} fetcher={ctx.fetcher} />}
	</FetcherContext.Consumer>
);

export default ContactFormWithFetcherContext;
