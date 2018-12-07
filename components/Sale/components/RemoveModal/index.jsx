import React from "react";
import PropTypes from "prop-types";
import { Modal, Button, Dimmer } from "semantic-ui-react";
import { SALE_TITLE } from "@consts/sale";
import { SaleContext } from "../../context";

const RemoveModal = ({
	cancel,
	isRemoving,
	removeSaleStart,
	saleTitle,
	isHydrating
}) => (
	<Modal size="tiny" open={isRemoving} onClose={cancel}>
		<Modal.Header>Подтвердите действие</Modal.Header>
		<Modal.Content>{`Вы действительно хотите удалить акцию "${saleTitle}". Данное действите нельзя будет отменить`}</Modal.Content>
		<Modal.Actions>
			<Dimmer.Dimmable dimmed={isHydrating}>
				<Button loading={isHydrating} color="red" onClick={removeSaleStart}>
					Удалить
				</Button>
				<Button onClick={cancel}>Отмена</Button>
			</Dimmer.Dimmable>
		</Modal.Actions>
	</Modal>
);

RemoveModal.propTypes = {
	cancel: PropTypes.func.isRequired,
	isRemoving: PropTypes.bool.isRequired,
	removeSaleStart: PropTypes.func.isRequired,
	isHydrating: PropTypes.bool.isRequired,
	saleTitle: PropTypes.string.isRequired
};

const RemoveModalWithSaleContext = props => (
	<SaleContext.Consumer>
		{ctx => (
			<RemoveModal
				{...props}
				isRemoving={ctx.removing.isRemoving}
				saleTitle={ctx.sale[SALE_TITLE]}
				isHydrating={ctx.removing.isHydrating}
				removeSaleStart={ctx.removeSaleStart}
				cancel={() => ctx.handleIsRemoving(false)}
			/>
		)}
	</SaleContext.Consumer>
);

export default RemoveModalWithSaleContext;
