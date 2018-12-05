import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { Menu } from "semantic-ui-react";
import Block from "@components/Block";
import { UIContext } from "@providers";
import { ARTICLE_TITLE, ARTICLE_SLUG } from "@consts/article";
import { ArticleSingleContext } from "../../context";
import styles from "./styles";

const Sidebar = ({ categoriesAndArticles, ...rest }) => (
	<div className={styles.sidebar}>
		{categoriesAndArticles && (
			<Block>
				<Menu secondary className={styles.menu} fluid vertical>
					{Object.values(categoriesAndArticles).map(item => {
						if (item.elements) {
							return (
								<Menu.Item>
									{item.title}
									<Menu.Menu className={styles.subMenu}>
										{item.elements.map((article, index) => (
											<Link
												key={index}
												href={`/article/${article[ARTICLE_SLUG]}`}
											>
												<Menu.Item
													className={styles.item}
													name={article[ARTICLE_TITLE]}
													active={article._id === rest.articleId}
													as="a"
												/>
											</Link>
										))}
									</Menu.Menu>
								</Menu.Item>
							);
						}

						return (
							<Link key={item._id} href={`/article/${item[ARTICLE_SLUG]}`}>
								<Menu.Item
									name={item[ARTICLE_TITLE]}
									active={item._id === rest.articleId}
									as="a"
								/>
							</Link>
						);
					})}
				</Menu>
			</Block>
		)}
	</div>
);

Sidebar.propTypes = {
	articleId: PropTypes.string.isRequired,
	categoriesAndArticles: PropTypes.object
};

Sidebar.defaultProps = {
	categoriesAndArticles: null
};

const SidebarWithArticleSingleContext = props => (
	<ArticleSingleContext.Consumer>
		{ctx => <Sidebar {...props} articleId={ctx.temporaryArticle._id} />}
	</ArticleSingleContext.Consumer>
);

const SidebarWithUIContext = props => (
	<UIContext.Consumer>
		{ctx => (
			<SidebarWithArticleSingleContext
				{...props}
				categoriesAndArticles={ctx.ui.menu}
			/>
		)}
	</UIContext.Consumer>
);

export default SidebarWithUIContext;
