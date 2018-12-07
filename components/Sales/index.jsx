import React from "react";
import PropTypes from "prop-types";
import Block from "@components/Block";
import { Loader } from "semantic-ui-react";
import { Heading } from "@components/Typography";
import ErrorMessage from "@components/ErrorMessage";
import Margin from "@components/Margin";
import List from "./components/List";
import CreateButton from "./components/CreateButton";
import { SalesProvider, SalesContext } from "./context";
import styles from "./styles";

class Sales extends React.Component {
	componentDidMount = () => {
		const { hasSalesIds, fetchSalesStart } = this.props;

		if (!hasSalesIds) {
			fetchSalesStart();
		}
	};

	render = () => {
		const { fetchError, hasSalesIds, canEdit, isFetching } = this.props;

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
						title="Акций нет"
						error="В данный момент у нас не проходит ни одной акции"
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
						{isFetching ? <Loader active centered inline /> : <List />}
					</Margin>
				</div>
			</Block>
		);
	};
}

Sales.propTypes = {
	fetchError: PropTypes.string,
	isFetching: PropTypes.bool.isRequired,
	fetchSalesStart: PropTypes.func.isRequired,
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
					fetchError={ctx.fetching.error}
					canEdit={ctx.canEdit}
					isFetching={ctx.fetching.isHydrating}
					fetchSalesStart={ctx.fetchSalesStart}
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
