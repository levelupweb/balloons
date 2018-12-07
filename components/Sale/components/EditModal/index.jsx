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

import { SaleContext } from "../../context";

const EditModal = ({
	cancel,
	isEditing,
	updateSaleStart,
	getTemporaryField,
	isHydrating,
	error,
	typeErrors,
	handleTemporarySale
}) => (
	<Modal size="tiny" open={isEditing} onClose={cancel}>
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
								<Message.Item key={index}>{typeErrors[error].msg}</Message.Item>
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
				<Button loading={isHydrating} color="green" onClick={updateSaleStart}>
					Сохранить изменения
				</Button>
				<Button onClick={cancel}>Отмена</Button>
			</Dimmer.Dimmable>
		</Modal.Actions>
	</Modal>
);

EditModal.propTypes = {
	cancel: PropTypes.func.isRequired,
	isEditing: PropTypes.bool.isRequired,
	updateSaleStart: PropTypes.func.isRequired,
	getTemporaryField: PropTypes.func.isRequired,
	typeErrors: PropTypes.array,
	handleTemporarySale: PropTypes.func.isRequired,
	error: PropTypes.string,
	isHydrating: PropTypes.bool.isRequired
};

EditModal.defaultProps = {
	typeErrors: null,
	error: null
};

const RemoveModalWithSaleContext = props => (
	<SaleContext.Consumer>
		{ctx => (
			<EditModal
				{...props}
				isEditing={ctx.updating.isEditing}
				handleTemporarySale={ctx.handleTemporarySale}
				getTemporaryField={ctx.getTemporaryField}
				typeErrors={ctx.updating.typeErrors}
				error={ctx.updating.error}
				isHydrating={ctx.updating.isHydrating}
				updateSaleStart={ctx.updateSaleStart}
				cancel={() => ctx.handleIsEditing(false)}
			/>
		)}
	</SaleContext.Consumer>
);

export default RemoveModalWithSaleContext;
