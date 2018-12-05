import React from "react";
import PropTypes from "prop-types";
import { Loader } from "semantic-ui-react";
import Block from "@components/Block";
import Article from "@components/Article";
import BlockHeader from "@components/BlockHeader";
import Preview from "./components/Preview";
import { Paragraph } from "@components/Typography";
import { ArticlesContext, ArticlesProvider } from "./context";
import styles from "./styles";

class Articles extends React.Component {
	componentDidMount = () => {
		const { fetchArticlesStart } = this.props;

		fetchArticlesStart();
	};

	render = () => {
		const { articles, isHydrating, error } = this.props;

		if (error) {
			return (
				<Block className={styles.info}>
					<Paragraph>{error}</Paragraph>
				</Block>
			);
		}

		if (!articles || isHydrating) {
			return (
				<Block className={styles.info}>
					<Loader active centered />
				</Block>
			);
		}

		return (
			<div className={styles.list}>
				<BlockHeader
					title="Статьи"
					description="Редактируйте или создайте новую статью"
				/>
				{articles.map(articleId => (
					<Block className={styles.item} key={articleId}>
						<Article articleId={articleId}>
							{article => <Preview article={article} />}
						</Article>
					</Block>
				))}
			</div>
		);
	};
}

Articles.propTypes = {
	fetchArticlesStart: PropTypes.func.isRequired,
	error: PropTypes.string,
	isHydrating: PropTypes.bool.isRequired,
	articles: PropTypes.array
};

Articles.defaultProps = {
	articles: null,
	error: null
};

const ArticlesWithContext = props => (
	<ArticlesProvider>
		<ArticlesContext.Consumer>
			{ctx => (
				<Articles
					{...props}
					isHydrating={ctx.isHydrating}
					articles={ctx.articles}
					error={ctx.error}
					fetchArticlesStart={ctx.fetchArticlesStart}
				/>
			)}
		</ArticlesContext.Consumer>
	</ArticlesProvider>
);

export default ArticlesWithContext;
