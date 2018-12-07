import React from "react";
import PropTypes from "prop-types";
import Field from "@components/Field";
import Margin from "@components/Margin";
import FileUploader from "@components/FileUploader";
import { resolveImageUrl } from "@utils";
import { Paragraph } from "@components/Typography";
import styles from "./styles";

import {
	Form,
	Message,
	Grid,
	Modal,
	Button,
	Dimmer,
	Input,
	TextArea
} from "semantic-ui-react";

import {
	SALE_TITLE,
	SALE_DESCRIPTION,
	SALE_DISCOUNT,
	SALE_IMAGE
} from "@consts/sale";

import { SalesContext } from "../../context";

const CreateButton = ({
	isHydrating,
	handleTemporarySale,
	getTemporaryField,
	typeErrors,
	error,
	cancel,
	open,
	createSaleStart,
	isCreating
}) => (
	<React.Fragment>
		<Button onClick={open} circular color="green">
			Создать новую
		</Button>
		<Modal size="tiny" onClose={cancel} open={isCreating}>
			<Modal.Header>Редактирование акции</Modal.Header>
			<Modal.Content>
				{error && (
					<Margin bottom>
						<Message negative>
							<Message.Header>Ошибка</Message.Header>
							<p>{error}</p>
						</Message>
					</Margin>
				)}
				{typeErrors && (
					<Margin bottom>
						<Message negative>
							<Message.Header>Ошибка</Message.Header>
							<Message.List>
								{Object.keys(typeErrors).map((error, index) => (
									<Message.Item key={index}>
										{typeErrors[error].msg}
									</Message.Item>
								))}
							</Message.List>
						</Message>
					</Margin>
				)}
				<Form loading={isHydrating}>
					<Field title="Новое название акции" description="Обязательное поле">
						<Input
							placeholder="Введите название акции"
							fluid
							value={getTemporaryField(SALE_TITLE)}
							onChange={(_, { value }) =>
								handleTemporarySale({
									[SALE_TITLE]: value
								})
							}
						/>
					</Field>
					<Margin top>
						<Field title="Описание акции" description="Обязательное поле">
							<TextArea
								autoHeight
								rows={2}
								placeholder="Введите небольшое описание акции"
								fluid
								value={getTemporaryField(SALE_DESCRIPTION)}
								onChange={(_, { value }) =>
									handleTemporarySale({
										[SALE_DESCRIPTION]: value
									})
								}
							/>
						</Field>
					</Margin>
					<Margin top>
						<Field title="Изображение" description="Загрузите изображение">
							<Grid stackable>
								<Grid.Column width={6}>
									<div
										className={styles.element}
										style={{
											backgroundImage: `url(${resolveImageUrl(
												getTemporaryField(SALE_IMAGE)
											)})`
										}}
									/>
								</Grid.Column>
								<Grid.Column width={10}>
									<Paragraph>
										Выберите PNG, JPEG или JPG формат. Не более 2 мб
									</Paragraph>
									<Margin top>
										<FileUploader
											onUrl={url =>
												handleTemporarySale({
													[SALE_IMAGE]: url
												})
											}
										/>
									</Margin>
								</Grid.Column>
							</Grid>
						</Field>
					</Margin>
					<Margin top>
						<Field title="Скидка" description="Необязательное поле">
							<Input
								type="number"
								min={0}
								max={100}
								placeholder="Введите скидку в %, если есть"
								fluid
								value={getTemporaryField(SALE_DISCOUNT)}
								onChange={(_, { value }) =>
									handleTemporarySale({
										[SALE_DISCOUNT]: parseFloat(value)
									})
								}
							/>
						</Field>
					</Margin>
				</Form>
			</Modal.Content>
			<Modal.Actions>
				<Dimmer.Dimmable dimmed={isHydrating}>
					<Button loading={isHydrating} color="green" onClick={createSaleStart}>
						Создать
					</Button>
					<Button onClick={cancel}>Отмена</Button>
				</Dimmer.Dimmable>
			</Modal.Actions>
		</Modal>
	</React.Fragment>
);

CreateButton.propTypes = {
	createSaleStart: PropTypes.func.isRequired,
	getTemporaryField: PropTypes.func.isRequired,
	isHydrating: PropTypes.bool.isRequired,
	isCreating: PropTypes.bool.isRequired,
	open: PropTypes.func.isRequired,
	cancel: PropTypes.func.isRequired,
	handleTemporarySale: PropTypes.func.isrequired,
	typeErrors: PropTypes.array,
	error: PropTypes.string
};

CreateButton.defaultProps = {
	typeErrors: null,
	error: null
};

const CreateButtonWithSalesContext = props => (
	<SalesContext.Consumer>
		{ctx => (
			<CreateButton
				{...props}
				getTemporaryField={ctx.getTemporaryField}
				createSaleStart={ctx.createSaleStart}
				isHydrating={ctx.creating.isHydrating}
				handleTemporarySale={ctx.handleTemporarySale}
				error={ctx.creating.error}
				typeErrors={ctx.creating.typeErrors}
				cancel={() => ctx.handleIsCreating(false)}
				open={() => ctx.handleIsCreating(true)}
				isCreating={ctx.creating.isCreating}
			/>
		)}
	</SalesContext.Consumer>
);

export default CreateButtonWithSalesContext;
