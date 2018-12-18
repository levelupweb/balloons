import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import router from "next/router";
import { Message, Button, Form } from "semantic-ui-react";
import BlockHeader from "@components/BlockHeader";
import { Paragraph } from "@components/Typography";
import Field from "@components/Field";
import Margin from "@components/Margin";
import Block from "@components/Block";
import Title from "./components/Title";
import Description from "./components/Description";
import Image from "./components/Image";
import ErrorBox from "./components/ErrorBox";
import Submit from "./components/Submit";
import Content from "./components/Content";
import { CreateNewsContext, CreateNewsProvider } from "./context";
import styles from "./styles";

class CreateNews extends React.Component {
	componentDidMount = () => {
		const { mayPost } = this.props;

		if (!mayPost) {
			router.push("/admin");
		}
	};

	componentDidUpdate = prevProps => {
		if (prevProps.createdNewsId !== this.props.createdNewsId) {
			window.scroll({ top: 0, left: 0, behavior: "smooth" });
		}
	};

	render = () => {
		const { error, typeErrors, createdNewsId, mayPost } = this.props;

		if (!mayPost) {
			return (
				<div className={styles.inner}>
					<Block>
						<Paragraph>Перенаправление..</Paragraph>
					</Block>
				</div>
			);
		}

		return (
			<div className={styles.inner}>
				<div className={styles.header}>
					<BlockHeader
						noBorder
						title="Создание новости"
						description="Создайте публикацию, заполнив простую форму"
					/>
				</div>

				{createdNewsId && (
					<div>
						<Message success>
							<div className={styles.successMessage}>
								<div className={styles.content}>
									<Message.Header>Поздравляем!</Message.Header>
									<p>
										Новость успешно опубликована. Хотите просмотреть
										опубликованную новость?
									</p>
								</div>
								<Margin className={styles.btn} left>
									<Link href={`/news/entry?id=${createdNewsId}`}>
										<a>
											<Button circular color="green">
												Просмотреть новость
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
							<Field title="Заголовок">
								<Title />
							</Field>
							<Margin top>
								<Field
									description="Придумайте яркий анонс, чтобы привлечь внимание"
									title="Анонс к публикации"
								>
									<Description />
								</Field>
							</Margin>
						</Block>
						<Block>
							<Field
								description="Данное изображение будет использовано как обложка"
								title="Изображение"
							>
								<Image />
							</Field>
						</Block>
						<Block>
							<Field title="Основной контент">
								<Content />
							</Field>
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

CreateNews.propTypes = {
	error: PropTypes.string,
	createdNewsId: PropTypes.string,
	typeErrors: PropTypes.object,
	mayPost: PropTypes.bool.isRequired
};

CreateNews.defaultProps = {
	error: null,
	typeErrors: null,
	createdNewsId: null
};

const CreateNewsWithProvider = () => (
	<CreateNewsProvider>
		<CreateNewsContext.Consumer>
			{ctx => (
				<CreateNews
					createdNewsId={ctx.createdNewsId}
					typeErrors={ctx.creating.typeErrors}
					mayPost={ctx.mayPost}
					error={ctx.creating.error}
				/>
			)}
		</CreateNewsContext.Consumer>
	</CreateNewsProvider>
);

export default CreateNewsWithProvider;
