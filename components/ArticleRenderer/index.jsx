import React from "react";
import PropTypes from "prop-types";
import ReactDOMServer from "react-dom/server";
import HtmlToReact, { Parser } from "html-to-react";
import { Heading, Paragraph } from "@components/Typography";
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
			shouldProcessNode: node => node.name === "p",
			processNode: (node, children, index) =>
				React.createElement(
					Paragraph,
					{
						...node.attribs,
						style: parseStyles(node.attribs.style),
						key: index,
						className: styles.p
					},
					children
				)
		},
		{
			shouldProcessNode: node =>
				node.name === "h1" ||
				node.name === "h2" ||
				node.name === "h3" ||
				node.name === "h4" ||
				node.name === "h5" ||
				node.name === "h6",
			processNode: (node, children, index) => {
				const size = node.name[1];

				return React.createElement(
					Heading,
					{
						...node.attribs,
						key: index,
						size: parseFloat(size),
						as: node.name
					},
					children
				);
			}
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
			className={styles.article}
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
