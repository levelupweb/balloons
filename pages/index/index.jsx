import React from "react";
import classes from "classnames";
import DefaultContainer from "@containers/Default";
import { Paragraph, Heading, List } from "@components/Typography";
import IndexSlider from "@components/IndexSlider";
import Advantages from "@components/Advantages";
import Margin from "@components/Margin";
import Calculator from "@components/Calculator";
import BlockHeader from "@components/BlockHeader";

import styles from "./styles";

const IndexPage = () => (
	<DefaultContainer>
		<div className={styles.indexPage}>
			<IndexSlider />
			<Margin top bottom double className={styles.field}>
				<BlockHeader
					title="О компании"
					description={"ООО \"Золотая стрекоза\""}
				/>
				<div className={classes(styles.content, styles.c1)}>
					<div className={styles.left}>
						<Paragraph>
							{`
							Общество с ограниченной ответственностью "Золотая стрекоза"
							работает на российском рынке с 2010 года. По адресу Владимир, ул.
							Комиссарова, д. 10а. к Вашим услугам ПА "Золотая стрекоза"
							`}
						</Paragraph>
						<Margin top>
							<Heading size={5} as="h4">
								Основные направления нашей работы:
							</Heading>
						</Margin>
						<Margin top left>
							<List>
								{[
									"Печать на воздушных шарах",
									`Оформление праздничных мероприятий, внутреннее и наружное
								оформление шарами торговых помещений`,
									"Услуги по накачке, доставке и раздаче шаров",
									"И многое другое.."
								]}
							</List>
						</Margin>
					</div>
					<Margin left className={styles.right}>
						<img src={require("./img/logo.png")} />
					</Margin>
				</div>
			</Margin>
			<Margin top bottom double className={styles.field}>
				<BlockHeader
					title="Преимущества"
					description="Узнайте о преимуществах работы с нами"
				/>
				<div className={classes(styles.content, styles.c2)}>
					<Advantages>
						{[
							[
								"Многоцветная печать",
								"Многоцветные печать – это, прежде всего, печать индивидуальности. Она персонализирует вас как обладателя яркой репутации. Внимание целевой аудитории кам будет обеспечено",
								require("./img/balloons.png")
							],
							[
								"Точные сроки выполнения",
								"Вы можете быть спокойны, ведь главное для нас это выполнить свою задачу качественно и в срок. Мы не подведем ни вас ни ваш праздник",
								require("./img/balloons.png")
							],
							[
								"Низкие цены",
								"Вы будете рады низким ценам на нашу качественную продукцию. К тому же вы можете получить индивидуальную скидку. Сделаем наше взаимное сотрудничество еще выгоднее!",
								require("./img/balloons.png")
							],
							[
								"Собственный склад",
								"У нас имеется большой запас шаров, необходимых для оперативной печати или оформления.",
								require("./img/balloons.png")
							],
							[
								"Доставка в регионы",
								"Территориально деятельность компании не ограничивается Москвой: используя службы курьерской доставки, мы оперативно выполняем и доставляем заказы для всей страны.",
								require("./img/balloons.png")
							]
						]}
					</Advantages>
				</div>
			</Margin>
			<Margin top bottom double className={styles.field}>
				<BlockHeader
					title="Онлайн-калькулятор"
					description="Рассчитайте стоимость своего заказа"
				/>
				<div className={classes(styles.content, styles.c3)}>
					<Calculator />
				</div>
			</Margin>
		</div>
	</DefaultContainer>
);

export default IndexPage;
