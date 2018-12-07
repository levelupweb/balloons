import React from "react";
import PropTypes from "prop-types";
import Block from "@components/Block";
import { Heading } from "@components/Typography";
import ErrorMessage from "@components/ErrorMessage";
import Margin from "@components/Margin";
import List from "./components/List";
import CreateButton from "./components/CreateButton";
import { SalesProvider, SalesContext } from "./context";
import styles from "./styles";

const Sales = ({ fetchError, hasSalesIds, canEdit }) => {
	if (fetchError) {
		return (
			<Block className={styles.errorWrapper}>
				<ErrorMessage error={fetchError} />
			</Block>
		);
	}

	if (!hasSalesIds) {
		return (
			<Block className={styles.errorWrapper}>
				<ErrorMessage
					title="Акции не найдены"
					error="Похоже, что активных акций в данный момент нет"
				/>
			</Block>
		);
	}

	return (
		<Block>
			<div className={styles.wrapper}>
				<div className={styles.title}>
					<div className={styles.left}>
						<Heading as="h1">Активные акции</Heading>
						<Heading sub as="p" size={5}>
							Найдите хорошее предложение от нашей компании и заказывайте с
							выгодой!
						</Heading>
					</div>
					{canEdit && (
						<div className={styles.bar}>
							<CreateButton />
						</div>
					)}
				</div>

				<Margin top double className={styles.list}>
					<List />
				</Margin>
			</div>
		</Block>
	);
};

Sales.propTypes = {
	fetchError: PropTypes.string,
	hasSalesIds: PropTypes.bool.isRequired,
	canEdit: PropTypes.bool.isRequired
};

Sales.defaultProps = {
	fetchError: null
};

const SalesWithProvider = props => (
	<SalesProvider fetchError={props.error} salesIds={props.salesIds}>
		<SalesContext.Consumer>
			{ctx => (
				<Sales
					{...props}
					hasSalesIds={!!ctx.salesIds && ctx.salesIds.length > 0}
					fetchError={ctx.fetchError}
					canEdit={ctx.canEdit}
				/>
			)}
		</SalesContext.Consumer>
	</SalesProvider>
);

SalesWithProvider.propTypes = {
	salesIds: PropTypes.arrayOf(PropTypes.string),
	error: PropTypes.string
};

SalesWithProvider.defaultProps = {
	salesIds: null,
	error: null
};

export default SalesWithProvider;
