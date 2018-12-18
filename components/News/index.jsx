import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "next/router";
import { Loader, Button, Message } from "semantic-ui-react";
import Block from "@components/Block";
import Margin from "@components/Margin";
import BlockHeader from "@components/BlockHeader";
import { Paragraph } from "@components/Typography";
import { NewsContext, NewsProvider } from "./context";
import styles from "./styles";

class News extends React.Component {
	componentDidMount = () => {
		const { displayNews, fetchError } = this.props;

		if (fetchError) {
			return;
		}

		if (!displayNews) {
			this.fetchNewsStart();
		}
	};

	componentDidUpdate = prevProps => {
		const { currentPage } = this.props;

		if (currentPage !== prevProps.currentPage) {
			this.fetchNewsStart();
		}
	};

	render = () => {
		const { displayNews, isHydrating, fetchError, fetchNewsStart } = this.props;

		if (fetchError) {
			return (
				<Block>
					<Paragraph>{fetchError}</Paragraph>
					<Margin top>
						<Button loading={isHydrating} onClick={fetchNewsStart}>
							Попробовать ещё раз
						</Button>
					</Margin>
				</Block>
			);
		}

		if (!displayNews || isHydrating) {
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
				<BlockHeader title="Новости" description="Наши последние новости" />
				{displayNews.length > 0 ? (
					displayNews.map(news => news)
				) : (
					<Message info>
						<Message.Header>Упс. Ошибка</Message.Header>
						<p>Похоже, что ни одной новости ещё нет. Скоро они появятся</p>
					</Message>
				)}
			</div>
		);
	};
}

News.propTypes = {
	fetchNewsStart: PropTypes.func.isRequired,
	fetchError: PropTypes.string,
	replace: PropTypes.func.isRequired,
	isHydrating: PropTypes.bool.isRequired,
	displayNews: PropTypes.array,
	currentPage: PropTypes.number,
	pathname: PropTypes.string.isRequired
};

News.defaultProps = {
	displayNews: null,
	currentPage: null,
	fetchError: null
};

const NewsWithContext = props => (
	<NewsProvider
		currentPage={props.router.query.page}
		fetchError={props.fetchError}
		defaultNews={props.defaultNews}
	>
		<NewsContext.Consumer>
			{ctx => (
				<News
					currentPage={ctx.currentPage}
					replace={props.router.replace}
					pathname={props.router.pathname}
					isHydrating={ctx.fetching.isHydrating}
					displayNews={ctx.displayNews}
					fetchError={ctx.fetching.error}
					fetchNewsStart={ctx.fetchNewsStart}
				/>
			)}
		</NewsContext.Consumer>
	</NewsProvider>
);

NewsWithContext.propTypes = {
	defaultNews: PropTypes.array,
	router: PropTypes.object,
	fetchError: PropTypes.string
};

NewsWithContext.defaultProps = {
	fetchError: null,
	defaultNews: null
};

export default withRouter(NewsWithContext);
