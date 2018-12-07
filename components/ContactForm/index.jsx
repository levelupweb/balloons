import React from "react";
import { withAsyncSetState } from "@utils";
import { Paragraph, Heading } from "@components/Typography";
import Field from "@components/Field";
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
	Button,
	Popup,
	Grid,
	Checkbox
} from "semantic-ui-react";

import styles from "./styles";

class ContactForm extends React.Component {
	state = {
		data: {},
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

	getTypeError = field => {
		const { typeErrors } = this.state;

		return typeErrors && typeErrors[field] && typeErrors[field].msg;
	};

	render = () => {
		const { error, data, isHydrating } = this.state;
		return (
			<div className={styles.form}>
				<Margin top>
					<Form inverted loading={isHydrating}>
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
									<Popup
										open={!!this.getTypeError(CONTACT_PHONE)}
										trigger={
											<Field
												value={data[CONTACT_PHONE]}
												onChange={(_, { value }) =>
													this.handleData({
														[CONTACT_PHONE]: value
													})
												}
												title="Номер телефона"
											>
												<Input fluid placeholder="+7" />
											</Field>
										}
									>
										{this.getTypeError(CONTACT_PHONE)}
									</Popup>
								</Grid.Column>
							</Grid.Row>
							<Grid.Row>
								<Grid.Column width={16}>
									<Field title="Ваше сообщение">
										<Popup
											open={!!this.getTypeError(CONTACT_MESSAGE)}
											trigger={
												<TextArea
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
										<Button className={styles.button} loading={isHydrating}>
											Отправить
										</Button>
										<Checkbox
											inverted
											label="Я соглашаюсь с правилами обработки данных"
											checked={data[CONTACT_AGREEMENT]}
											onChange={(_, { checked }) =>
												this.handleData({
													[CONTACT_AGREEMENT]: checked
												})
											}
										/>
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

const ContactFormWithAsyncSetState = withAsyncSetState(ContactForm);

export default ContactFormWithAsyncSetState;
