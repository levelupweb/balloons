import React from "react";
import PropTypes from "prop-types";
import Modal from "@components/Modal";
import EditSlide from "../EditSlide";
import CreateNewSlide from "../CreateNewSlide";
import { NOTIFICATION_VARIANT_SUCCESS } from "@components/Notification/consts";
import Notification from "@components/Notification";
import Margin from "@components/Margin";
import Button from "@components/Button";
import { IndexSliderContext } from "../../context";
import styles from "./styles.less";

class EditBar extends React.Component {
	componentDidUpdate = prevProps => {
		const { info } = this.props;

		if (info !== prevProps.info) {
			this.getModalWrapper().scroll({ top: 0, behavior: "smooth" });
		}
	};

	getModalWrapper = () =>
		document.getElementsByClassName("ReactModal__Content--after-open")[0];

	renderSlides = () => {
		const { slides } = this.props;

		if (!slides || slides.length === 0) {
			return "Слайды не найдены";
		}

		return slides.map((slideId, index) => (
			<div key={slideId} className={styles.slide}>
				<EditSlide index={index + 1} slideId={slideId} />
			</div>
		));
	};

	render = () => {
		return (
			<Modal trigger={<Button>Редактировать</Button>}>
				{this.props.info && (
					<Margin bottom>
						<Notification
							content={this.props.info}
							variant={NOTIFICATION_VARIANT_SUCCESS}
						/>
					</Margin>
				)}
				<div className={styles.slides}>{this.renderSlides()}</div>
				<div className={styles.createNew}>
					<CreateNewSlide />
				</div>
			</Modal>
		);
	};
}

EditBar.propTypes = {
	slides: PropTypes.arrayOf(PropTypes.object),
	info: PropTypes.string
};

EditBar.defaultProps = {
	slides: null,
	info: null
};

const EditBarWithIndexSliderContext = props => (
	<IndexSliderContext.Consumer>
		{ctx => <EditBar {...props} slides={ctx.slides} info={ctx.info} />}
	</IndexSliderContext.Consumer>
);

export default EditBarWithIndexSliderContext;
