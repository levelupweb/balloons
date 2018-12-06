import React, { Component } from "react";
import PropTypes from "prop-types";
import { debounce } from "throttle-debounce";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import {
	isFunction,
	fetch,
	parseError,
	withAsyncSetState,
	getStorageUrl
} from "@utils";
import { FETCH_FILE_UPLOAD } from "@consts/_fetch";
import { Editor } from "react-draft-wysiwyg";
import { FetcherContext } from "@providers";
import htmlToDraft from "html-to-draftjs";
import blockRender from "./blockRender";
import draftToHtml from "draftjs-to-html";
import { toolbar } from "./toolbar";
import styles from "./styles";

class ControlledEditor extends Component {
	constructor(props) {
		super(props);
		this.debounceUpdateOnChange = debounce(300, this.fireOnChange);
		this.state = {
			editorState: this.setupEditorState()
		};
	}

	setupEditorState = () => {
		const { html } = this.props;

		if (html) {
			const { contentBlocks, entityMap } = htmlToDraft(html);
			const contentState = ContentState.createFromBlockArray(
				contentBlocks,
				entityMap
			);

			return EditorState.createWithContent(contentState);
		}

		return EditorState.createEmpty();
	};

	fireOnChange = () => {
		const { onChange } = this.props;
		const { editorState } = this.state;
		if (isFunction(onChange)) {
			const rawContentState = convertToRaw(editorState.getCurrentContent());
			onChange(draftToHtml(rawContentState));
		}
	};

	onEditorStateChange = editorState =>
		this.setState(
			{
				editorState
			},
			() => this.debounceUpdateOnChange()
		);

	handleChange = e => {
		const file = e.target.files[0];

		return this.asyncSetState({
			file,
			error: null,
			isUploading: true
		}).then(this.uploadStart);
	};

	uploadStart = file => {
		const data = new FormData();

		data.append(file.name, file);

		return this.uploadFileProcess(data);
	};

	uploadFileProcess = data => {
		const { fetcher } = this.props;

		return fetch(fetcher, FETCH_FILE_UPLOAD, data)
			.then(this.uploadFileSuccess)
			.catch(this.uploadFileFail);
	};

	uploadFileSuccess = ({ data }) => {
		return this.asyncSetState({
			isUploading: false,
			file: null
		}).then(() => Promise.resolve({ data: { link: getStorageUrl(data.url) } }));
	};

	uploadFileFail = reason => {
		alert(reason);
		this.asyncSetState({
			isUploading: false,
			error: parseError(reason)
		});
	};

	render = () => {
		const { editorState } = this.state;

		return (
			<div className={styles.editor}>
				<Editor
					editorState={editorState}
					placeholder="Начните писать статью здесь.."
					toolbarClassName={styles.toolbar}
					localization={{
						locale: "ru"
					}}
					toolbar={toolbar(this.uploadStart)}
					onEditorStateChange={this.onEditorStateChange}
				/>
			</div>
		);
	};
}

ControlledEditor.propTypes = {
	html: PropTypes.string.isRequired,
	onChange: PropTypes.func,
	fetcher: PropTypes.func.isRequired
};

ControlledEditor.defaultProps = {
	html: "",
	onChange: null,
	readOnly: false
};

const ControlledEditorWithAsyncSetState = withAsyncSetState(ControlledEditor);

const ControlledEditorWithFetcherContext = props => (
	<FetcherContext.Consumer>
		{ctx => (
			<ControlledEditorWithAsyncSetState {...props} fetcher={ctx.fetcher} />
		)}
	</FetcherContext.Consumer>
);

export default ControlledEditorWithFetcherContext;
