import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { Menu } from "semantic-ui-react";
import { Heading, Paragraph } from "@components/Typography";
import Block from "@components/Block";
import Margin from "@components/Margin";
import NewsResolver from "@components/NewsResolver";
import { NEWS_TITLE } from "@consts/news";
import { NewsSingleContext } from "../../context";
import styles from "./styles";

const Sidebar = ({ otherIds }) => (
	<div className={styles.sidebar}>
		<Block>
			{otherIds && otherIds.length > 0 ? (
				<React.Fragment>
					<Margin bottom>
						<Heading as="h3" size={5}>
							Другие новости
						</Heading>
					</Margin>
					<Menu secondary className={styles.menu} fluid vertical>
						{otherIds.map((id, index) => (
							<NewsResolver key={index} newsId={id}>
								{item => (
									<Link
										key={item._id}
										href={{
											pathname: "/news/item",
											query: {
												id: item._id
											}
										}}
									>
										<Menu.Item name={item[NEWS_TITLE]} as="a">
											{item[NEWS_TITLE]}
										</Menu.Item>
									</Link>
								)}
							</NewsResolver>
						))}
					</Menu>
				</React.Fragment>
			) : (
				<React.Fragment>
					<Heading as="h3" size={5}>
						Другие новости
					</Heading>
					<Margin top>
						<Paragraph>
							Похоже, что других новостей пока нет. Но скоро они обязательно
							появятся!
						</Paragraph>
					</Margin>
				</React.Fragment>
			)}
		</Block>
	</div>
);

Sidebar.propTypes = {
	otherIds: PropTypes.array
};

Sidebar.defaultProps = {
	otherIds: null
};

const SidebarWithNewsSingleContext = props => (
	<NewsSingleContext.Consumer>
		{ctx => <Sidebar {...props} otherIds={ctx.otherIds} />}
	</NewsSingleContext.Consumer>
);

export default SidebarWithNewsSingleContext;
