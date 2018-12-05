import React from "react";
import classes from "classnames";
import DefaultContainer from "@containers/Default";
import { Paragraph, Heading, List } from "@components/Typography";
import IndexSlider from "@components/IndexSlider";
import Advantages from "@components/Advantages";
import Margin from "@components/Margin";
import Clients from "@components/Clients";
import Calculator from "@components/Calculator";
import BlockHeader from "@components/BlockHeader";

import styles from "./styles";

const IndexPage = () => (
	<DefaultContainer
		afterNavigation={<IndexSlider />}
		mainClassName={styles.wrapper}
	>
		<div className={styles.indexPage}>
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
								require("./img/time.png")
							],
							[
								"Низкие цены",
								"Вы будете рады низким ценам на нашу качественную продукцию. К тому же вы можете получить индивидуальную скидку. Сделаем наше взаимное сотрудничество еще выгоднее!",
								require("./img/lowcosts.png")
							],
							[
								"Собственный склад",
								"У нас имеется большой запас шаров, необходимых для оперативной печати или оформления.",
								require("./img/sklad.png")
							],
							[
								"Доставка в регионы",
								"Территориально деятельность компании не ограничивается Москвой: используя службы курьерской доставки, мы оперативно выполняем и доставляем заказы для всей страны.",
								require("./img/deliveri.png")
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
			<Margin top bottom double className={styles.field}>
				<BlockHeader
					title="Сопутствующие услуги"
					description="Доверьте работу специалистам"
				/>
				<div className={classes(styles.content, styles.c4)}>
					<Advantages>
						{[
							[
								"Надув шаров воздухом",
								"Накачка шаров воздухом с закреплением зажима на шар. В стоимость входит: накачанный шар с закрепленным на него зажимом, палочки для шаров. Шары упаковываются в специальные транспортировочные мешки",
								require("./img/balloons.png")
							],
							[
								"Надув шаров гелием",
								"Накачка шаров гелием. В стоимость входит: накачка шара гелием, ленточка, при необходимости транспортировочный грузик.",
								require("./img/balloons.png")
							],
							[
								"Раздача воздушных шаров",
								"Раздача воздушных шаров (1 человек). Минимальный заказ 2 часа. При температуре воздуха менее -5 ºС и выше +25 ºС раздачу шаров не осуществляем.С и выше +25 ºС и выше +25 ºС раздачу шаров не осуществляем.С раздачу шаров не осуществляем.",
								require("./img/balloons.png")
							],
							[
								"Упаковка",
								"Упаковка (мешок для 40 шаров). Необходим для транспортировки шаров с зажимами, поскольку транспортировать шары на палочках в руках или с палочками в мешках невозможно. Палочки предоставляются отдельно в соответствующем количестве.",
								require("./img/box.png")
							],
							[
								"Доставка по городу",
								"Доставка грузовым транспортом. Доставка осуществляется по действующему тарифу служб такси г. Москвы.",
								require("./img/deliveri.png")
							],
							[
								"Гирлянды из воздушных шаров",
								"Изготовление, доставка, монтаж гирлянд из воздушных шаров. Также возможен самовывоз изготовленных нами гирлянд.",
								require("./img/balloonsmany.png")
							]
						]}
					</Advantages>
				</div>
			</Margin>
			<Margin top bottom double className={styles.field}>
				<BlockHeader title="Наши клиенты" description="Присоединяйтесь и вы!" />
				<div className={classes(styles.content, styles.c5)}>
					<Clients />
				</div>
			</Margin>
		</div>
	</DefaultContainer>
);

export default IndexPage;
