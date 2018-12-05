import React from "react";
import PropTypes from "prop-types";
import { Menu } from "semantic-ui-react";
import Article from "@components/Article";
import { ARTICLE_CONTENT, ARTICLE_TITLE } from "@consts/article";
import { ArticleSingleContext } from "../../context";
import styles from "./styles";

const Sidebar = ({ otherArticlesIds }) => (
	<div className={styles.sidebar}>
		{otherArticlesIds &&
			otherArticlesIds.map(articleId => (
				<Article articleId={articleId} key={articleId}>
					{article => <div>{article[ARTICLE_TITLE]}</div>}
				</Article>
			))}
	</div>
);

Sidebar.propTypes = {
	otherArticlesIds: PropTypes.arrayOf(PropTypes.string)
};

Sidebar.defaultProps = {
	otherArticlesIds: null
};

const SidebarWithArticleSingleContext = props => (
	<ArticleSingleContext.Consumer>
		{ctx => <Sidebar {...props} otherArticlesIds={ctx.otherArticlesIds} />}
	</ArticleSingleContext.Consumer>
);

export default SidebarWithArticleSingleContext;
