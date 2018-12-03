import React from "react";
import DefaultContainer from "@containers/Default";
import IndexSlider from "@components/IndexSlider";
import styles from "./styles";

const IndexPage = () => (
	<DefaultContainer>
		<div className={styles.indexPage}>
			<IndexSlider />
		</div>
	</DefaultContainer>
);

export default IndexPage;
