import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { Icon, Segment, Form, Button } from "semantic-ui-react";
import Margin from "@components/Margin";
import { Paragraph } from "@components/Typography";
import Block from "@components/Block";
import Description from "./components/Description";
import Actions from "./components/Actions";
import ErrorBox from "./components/ErrorBox";
import Meta from "./components/Meta";
import Title from "./components/Title";
import Images from "./components/Images";
import { PortfolioSingleProvider, PortfolioSingleContext } from "./context";
import styles from "./styles";

const PortfolioSingle = ({ fetchError, item, isEditing, hasUpdatingError }) => {
	if (fetchError) {
		return (
			<Segment>
				<Paragraph>{fetchError}</Paragraph>
			</Segment>
		);
	}

	if (item) {
		return (
			<main className={styles.main}>
				<Block>
					<Form>
						<div className={styles.title}>
							<Meta />
							<Margin top>
								<Link href="/portfolio">
									<a>
										<Button circular>
											<Icon name="angle left" />
											Вернуться к списку
										</Button>
									</a>
								</Link>
							</Margin>
							<Margin top>
								<Title />
								<Description />
							</Margin>
						</div>
					</Form>
					<div className={styles.content}>
						<Margin top>
							<Images />
						</Margin>
						{hasUpdatingError && (
							<Margin top>
								<ErrorBox />
							</Margin>
						)}
						{isEditing && (
							<Margin top>
								<Actions />
							</Margin>
						)}
					</div>
				</Block>
			</main>
		);
	}

	return null;
};

PortfolioSingle.propTypes = {
	fetchError: PropTypes.string,
	item: PropTypes.object.isRequired,
	hasUpdatingError: PropTypes.bool.isRequired,
	isEditing: PropTypes.bool.isRequired
};

PortfolioSingle.defaultProps = {
	fetchError: null
};

const PortfolioSingleWithContext = props => (
	<PortfolioSingleProvider
		defaultEditing={props.defaultEditing}
		fetchError={props.fetchError}
		portfolioId={props.portfolioId}
	>
		<PortfolioSingleContext.Consumer>
			{ctx => (
				<PortfolioSingle
					isEditing={ctx.isEditing}
					fetchError={ctx.fetchError}
					hasUpdatingError={!!ctx.updating.error || !!ctx.updating.typeErrors}
					item={ctx.item}
				/>
			)}
		</PortfolioSingleContext.Consumer>
	</PortfolioSingleProvider>
);

PortfolioSingleWithContext.propTypes = {
	defaultEditing: PropTypes.bool,
	fetchError: PropTypes.string,
	portfolioId: PropTypes.string
};

PortfolioSingleWithContext.defaultProps = {
	defaultEditing: false,
	fetchError: null,
	portfolioId: null
};

export default PortfolioSingleWithContext;
