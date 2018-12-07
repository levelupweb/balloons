import React from "react";
import PropTypes from "prop-types";
import { CallMeBackProvider, CallMeBackContext } from "./context";
import InModal from "./wrappers/InModal";
import Field from "@components/Field";
import Margin from "@components/Margin";
import Header from "./components/Header";
import Name from "./components/Name";
import Message from "./components/Message";
import SuccessBox from "./components/SuccessBox";
import ErrorBox from "./components/ErrorBox";
import Phone from "./components/Phone";
import { Modal, Form } from "semantic-ui-react";
import styles from "./styles";

const CallMeBack = ({ hasError, isSuccess, postMessageStart, isHydrating }) => (
	<Modal.Content>
		<div className={styles.wrapper}>
			<Margin bottom>
				<Header />
			</Margin>
			{isSuccess && <SuccessBox />}
			{hasError && <ErrorBox />}
			<Form loading={isHydrating} onSubmit={postMessageStart}>
				<div className={styles.fields}>
					<Field title="Ваше имя" description="Обязательное поле">
						<Name />
					</Field>
					<Margin top>
						<Field title="Контактный телефон" description="Обязательное поле">
							<Phone />
						</Field>
					</Margin>
					<Margin top>
						<Field
							title="Дополнительное сообщение"
							description="Обязательное поле"
						>
							<Message />
						</Field>
					</Margin>
				</div>
				<Margin top className={styles.actions}>
					<Form.Button primary>Отправить заявку</Form.Button>
				</Margin>
			</Form>
		</div>
	</Modal.Content>
);

CallMeBack.propTypes = {
	hasError: PropTypes.bool.isRequired,
	postMessageStart: PropTypes.func.isRequired,
	isHydrating: PropTypes.bool.isRequired,
	isSuccess: PropTypes.bool.isRequired
};

const CallMeBackWithProvider = ({ handleIsOpen, ...rest }) => (
	<CallMeBackProvider handleIsOpen={handleIsOpen}>
		<CallMeBackContext.Consumer>
			{ctx => (
				<CallMeBack
					{...rest}
					isHydrating={ctx.posting.isHydrating}
					postMessageStart={ctx.postMessageStart}
					hasError={!!ctx.posting.error}
					isSuccess={ctx.posting.isSuccess}
				/>
			)}
		</CallMeBackContext.Consumer>
	</CallMeBackProvider>
);

CallMeBackWithProvider.propTypes = {
	handleIsOpen: PropTypes.func.isrqeuired
};

const CallMeBackInModal = ({ children, ...rest }) => (
	<InModal trigger={children} {...rest}>
		{({ handleIsOpen, ...rest }) => (
			<CallMeBackWithProvider {...rest} handleIsOpen={handleIsOpen} />
		)}
	</InModal>
);

CallMeBackInModal.propTypes = {
	children: PropTypes.element.isRequired
};

export default CallMeBackInModal;
