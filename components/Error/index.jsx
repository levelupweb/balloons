import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { Grid, Button } from "semantic-ui-react";
import Link from "next/link";
import Block from "@components/Block";
import { Heading, Paragraph } from "@components/Typography";
import Icon from "@components/Icon";
import styles from "./styles";

const Error = ({ statusCode }) => (
	<div className={styles.wrapper}>
		<Head>
			<title>{`Упс! Ошибка ${statusCode}`}</title>
		</Head>
		<Block>
			<Grid stackable divided padded inverted verticalAlign="middle">
				<Grid.Row>
					<Grid.Column width={8} textAlign="center">
						<Heading as="h1" size={2}>
							Упс!
						</Heading>
						<Paragraph>
							{statusCode !== null
								? statusCode === 404
									? "Похоже, то, что вы искали на нашем сайте никогда не существовало, либо было удалено"
									: "Похоже, сервер в данный момент не может вам прислать свой ответ. Наши специалисты уже работают над проблемой"
								: "Похоже, что Вы нашли баг в нашем сервисе. Обязательно сообщите нам обм этом, чтобы мы могли исправить это как можно скорее"}
						</Paragraph>
					</Grid.Column>
					<Grid.Column width={8} textAlign="center">
						{statusCode === null ? (
							<React.Fragment>
								<Icon className={styles.icon} icon="bug-report" size={100} />
							</React.Fragment>
						) : (
							<Heading as="h1" size={2} className={styles.notfound}>
								{statusCode}
							</Heading>
						)}
					</Grid.Column>
				</Grid.Row>

				<Grid.Row>
					<Grid.Column width={16} textAlign="center">
						<Link href="/">
							<a>
								<Button circular>На главную</Button>
							</a>
						</Link>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		</Block>
	</div>
);

Error.propTypes = {
	statusCode: PropTypes.number
};

Error.defaultProps = {
	statusCode: null
};

export default Error;
