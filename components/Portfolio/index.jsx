import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { Loader, Button, Message, Card } from "semantic-ui-react";
import Block from "@components/Block";
import Margin from "@components/Margin";
import PortfolioResolver from "@components/PortfolioResolver";
import PortfolioPreview from "./components/PortfolioPreview";
import BlockHeader from "@components/BlockHeader";
import { AuthContext } from "@providers";
import { Paragraph } from "@components/Typography";
import { PortfolioContext, PortfolioProvider } from "./context";
import styles from "./styles";

class Portfolio extends React.Component {
	componentDidMount = () => {
		const { displayPortfolio, fetchError } = this.props;

		if (fetchError) {
			return;
		}

		if (!displayPortfolio) {
			this.fetchPortfolioStart();
		}
	};

	render = () => {
		const {
			displayPortfolio,
			isHydrating,
			fetchError,
			fetchPortfolioStart
		} = this.props;

		if (fetchError) {
			return (
				<Block>
					<Paragraph>{fetchError}</Paragraph>
					<Margin top>
						<Button loading={isHydrating} onClick={fetchPortfolioStart}>
							Попробовать ещё раз
						</Button>
					</Margin>
				</Block>
			);
		}

		if (!displayPortfolio || isHydrating) {
			return (
				<Block className={styles.loader}>
					<Loader inline active centered>
						Загрузка..
					</Loader>
				</Block>
			);
		}

		return (
			<div className={styles.list}>
				<div className={styles.header}>
					<BlockHeader
						noBorder
						title="Наши работы"
						description="Наши последние работы для клиентов"
					/>
					<AuthContext.Consumer>
						{ctx =>
							!!ctx.user && (
								<div className={styles.button}>
									<Link
										href={{
											pathname: "/portfolio/create"
										}}
									>
										<a>
											<Button circular color="green">
												Добавить работу
											</Button>
										</a>
									</Link>
								</div>
							)
						}
					</AuthContext.Consumer>
				</div>
				{displayPortfolio.length > 0 ? (
					<Card.Group itemsPerRow={3}>
						{displayPortfolio.map((item, index) => (
							<PortfolioResolver portfolioId={item} key={index}>
								{(portfolio, editable) => (
									<PortfolioPreview portfolio={portfolio} editable={editable} />
								)}
							</PortfolioResolver>
						))}
					</Card.Group>
				) : (
					<Message info>
						<Message.Header>Упс. Ошибка</Message.Header>
						<p>
							Похоже, что ни одной работы ещё не было опубликовано. Скоро они
							появятся
						</p>
					</Message>
				)}
			</div>
		);
	};
}

Portfolio.propTypes = {
	fetchPortfolioStart: PropTypes.func.isRequired,
	fetchError: PropTypes.string,
	isHydrating: PropTypes.bool.isRequired,
	displayPortfolio: PropTypes.array
};

Portfolio.defaultProps = {
	displayPortfolio: null,
	fetchError: null
};

const PortfolioWithContext = props => (
	<PortfolioProvider
		fetchError={props.fetchError}
		defaultPortfolio={props.defaultPortfolio}
	>
		<PortfolioContext.Consumer>
			{ctx => (
				<Portfolio
					isHydrating={ctx.fetching.isHydrating}
					displayPortfolio={ctx.displayPortfolio}
					fetchError={ctx.fetching.error}
					fetchPortfolioStart={ctx.fetchPortfolioStart}
				/>
			)}
		</PortfolioContext.Consumer>
	</PortfolioProvider>
);

PortfolioWithContext.propTypes = {
	defaultPortfolio: PropTypes.array,
	fetchError: PropTypes.string
};

PortfolioWithContext.defaultProps = {
	fetchError: null,
	defaultPortfolio: null
};

export default PortfolioWithContext;
