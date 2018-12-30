import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { Loader, Button, Message, Card } from "semantic-ui-react";
import Block from "@components/Block";
import Margin from "@components/Margin";
import NewsResolver from "@components/NewsResolver";
import NewsPreview from "./components/NewsPreview";
import BlockHeader from "@components/BlockHeader";
import { AuthContext } from "@providers";
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
				<div className={styles.header}>
					<BlockHeader
						noBorder
						title="Новости"
						description="Наши последние новости"
					/>
					<AuthContext.Consumer>
						{ctx =>
							!!ctx.user && (
								<div className={styles.button}>
									<Link
										href={{
											pathname: "/news/create"
										}}
									>
										<a>
											<Button circular color="green">
												Создать новость
											</Button>
										</a>
									</Link>
								</div>
							)
						}
					</AuthContext.Consumer>
				</div>
				{displayNews.length > 0 ? (
					<Card.Group itemsPerRow={3}>
						{displayNews.map((item, index) => (
							<NewsResolver newsId={item} key={index}>
								{(news, editable) => (
									<NewsPreview news={news} editable={editable} />
								)}
							</NewsResolver>
						))}
					</Card.Group>
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
	isHydrating: PropTypes.bool.isRequired,
	displayNews: PropTypes.array
};

News.defaultProps = {
	displayNews: null,
	fetchError: null
};

const NewsWithContext = props => (
	<NewsProvider fetchError={props.fetchError} defaultNews={props.defaultNews}>
		<NewsContext.Consumer>
			{ctx => (
				<News
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
	fetchError: PropTypes.string
};

NewsWithContext.defaultProps = {
	fetchError: null,
	defaultNews: null
};

export default NewsWithContext;
