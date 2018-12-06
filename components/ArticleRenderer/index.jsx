import React from "react";
import PropTypes from "prop-types";
import ReactDOMServer from "react-dom/server";
import HtmlToReact, { Parser } from "html-to-react";
import { parseStyles } from "@utils";
import { Image } from "semantic-ui-react";
import styles from "./styles";

const ArticleRenderer = ({ content }) => {
	const processNodeDefinitions = new HtmlToReact.ProcessNodeDefinitions(React);

	const processingInstructions = [
		{
			shouldProcessNode: node => node.name === "img",
			processNode: (node, _, index) =>
				React.createElement(Image, {
					...node.attribs,
					style: parseStyles(node.attribs.style),
					src: node.attribs.src,
					key: index,
					className: styles.image
				})
		},
		{
			shouldProcessNode: () => true,
			processNode: processNodeDefinitions.processDefaultNode
		}
	];

	const htmlToReactParser = new Parser();
	const reactComponent = htmlToReactParser.parseWithInstructions(
		content,
		() => true,
		processingInstructions
	);

	return (
		<div
			dangerouslySetInnerHTML={{
				__html: ReactDOMServer.renderToStaticMarkup(reactComponent)
			}}
		/>
	);
};

ArticleRenderer.propTypes = {
	content: PropTypes.string.isRequired
};

export default ArticleRenderer;
