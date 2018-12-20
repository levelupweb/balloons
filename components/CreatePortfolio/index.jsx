import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { Message, Button, Form } from "semantic-ui-react";
import BlockHeader from "@components/BlockHeader";
import Field from "@components/Field";
import Margin from "@components/Margin";
import Block from "@components/Block";
import Title from "./components/Title";
import Description from "./components/Description";
import Images from "./components/Images";
import ErrorBox from "./components/ErrorBox";
import Submit from "./components/Submit";
import { CreatePortfolioContext, CreatePortfolioProvider } from "./context";
import styles from "./styles";

class CreatePortfolio extends React.Component {
	componentDidUpdate = prevProps => {
		if (prevProps.createdPortfolioId !== this.props.createdPortfolioId) {
			window.scroll({ top: 0, left: 0, behavior: "smooth" });
		}
	};

	render = () => {
		const { error, typeErrors, createdPortfolioId } = this.props;

		return (
			<div className={styles.inner}>
				<div className={styles.header}>
					<BlockHeader
						noBorder
						title="Создание нового портфолио"
						description="Создайте портфолио, заполнив простую форму"
					/>
				</div>

				{createdPortfolioId && (
					<div>
						<Message success>
							<div className={styles.successMessage}>
								<div className={styles.content}>
									<Message.Header>Поздравляем!</Message.Header>
									<p>Запись успешно опубликована. Хотите ее просмотреть?</p>
								</div>
								<Margin className={styles.btn} left>
									<Link
										href={{
											pathname: "/portfolio/item",
											query: {
												id: createdPortfolioId
											}
										}}
									>
										<a>
											<Button circular color="green">
												Просмотреть
											</Button>
										</a>
									</Link>
								</Margin>
							</div>
						</Message>
					</div>
				)}
				<Form>
					<div className={styles.title}>
						<Block>
							<Field title="Название портфолио">
								<Title />
							</Field>
							<Margin top>
								<Field title="Краткое описание к портфолио">
									<Description />
								</Field>
							</Margin>
						</Block>
						<Block>
							<Field
								description="Галерея изображений для будущего портфолио"
								title="Изображения"
							>
								<Images />
							</Field>
						</Block>
						<Block>
							<Margin top>
								{(error || typeErrors) && (
									<Margin bottom>
										<ErrorBox />
									</Margin>
								)}
								<Submit />
							</Margin>
						</Block>
					</div>
				</Form>
			</div>
		);
	};
}

CreatePortfolio.propTypes = {
	error: PropTypes.string,
	createdPortfolioId: PropTypes.string,
	typeErrors: PropTypes.object,
	mayPost: PropTypes.bool.isRequired
};

CreatePortfolio.defaultProps = {
	error: null,
	typeErrors: null,
	createdPortfolioId: null
};

const CreatePortfolioWithProvider = () => (
	<CreatePortfolioProvider>
		<CreatePortfolioContext.Consumer>
			{ctx => (
				<CreatePortfolio
					createdPortfolioId={ctx.createdPortfolioId}
					typeErrors={ctx.creating.typeErrors}
					mayPost={ctx.mayPost}
					error={ctx.creating.error}
				/>
			)}
		</CreatePortfolioContext.Consumer>
	</CreatePortfolioProvider>
);

export default CreatePortfolioWithProvider;
