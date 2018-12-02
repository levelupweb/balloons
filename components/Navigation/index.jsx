import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "next/router";
import Link from "next/link";
import styles from "./styles";


const elements = [
	{
		type: "dropdown",
		title: "Печать на шарах",
		elements: [{
			link: "/how-to",
			title: "Как заказать",
		},
		{
			link: "/preparing",
			title: "Подготовка дизайн-макета",
		}, {
			link: "/choosing",
			title: "Выбор типа и цвета шара",
		}, {
			link: "/faq",
			title: "Вопросы и ответы",
		}]
	},
	{
		type: "dropdown",
		title: "Услуги",
		elements: [{
			link: "/prices",
			title: "Цены",
		},
		{
			link: "/accessories",
			title: "Аксессуары",
		}, {
			link: "/more",
			title: "Сопутствующие услуги",
		}]
	},
	{
		type: "simple",
		title: "Акции",
		link: "/hot"
	},
	{
		type: "simple",
		title: "Оплата и доставка",
		link: "/payments"
	},
	{
		type: "simple",
		title: "Контакты",
		link: "/contacts"
	},
]

class Navigation extends React.PureComponent {
	state = {
		activeElement: null,
	}

	isActive = link => {
		const { router } = this.props;

		return router.pathname === link;
	};

	handleActiveElement = element => 
		this.setState({
			activeElement: element
		});

	render = () => {
		const { activeElement } = this.state;

		return (
			<ul className={styles.nav}>
				<li onClick={this.handleActiveElement()} className={styles.drop}>
					Hello world
					<
				</li>
				<li>Hello world</li>
				<li>Hello world</li>
				<li>Hello world</li>
			</ul>
		)
	}
}

Navigation.propTypes = {
	router: PropTypes.object.isRequired
};

export default withRouter(Navigation);
