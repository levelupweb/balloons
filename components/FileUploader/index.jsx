import React from "react";
import PropTypes from "prop-types";
import { Button, Popup } from "semantic-ui-react";
import { withAsyncSetState, parseError, fetch } from "@utils";
import { FetcherContext } from "@providers";
import { FETCH_FILE_UPLOAD } from "@consts/_fetch";

class FileUploader extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			file: null,
			error: null,
			isUploading: false
		};

		this.input = React.createRef();
	}

	handleChange = e => {
		const file = e.target.files[0];

		return this.asyncSetState({
			file,
			error: null,
			isUploading: true
		}).then(this.uploadStart);
	};

	uploadStart = () => {
		const { file } = this.state;
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
		const { onUrl } = this.props;

		return this.asyncSetState({
			isUploading: false,
			file: null
		}).then(() => onUrl(data.url));
	};

	uploadFileFail = reason =>
		this.asyncSetState({
			isUploading: false,
			error: parseError(reason)
		});

	dismissError = () =>
		this.asyncSetState({
			error: null
		});

	render = () => {
		const { error, isUploading } = this.state;
		const { buttonProps, text, accept } = this.props;

		return (
			<React.Fragment>
				<Popup
					open={!!error}
					trigger={
						<Button
							primary
							loading={isUploading}
							circular
							onClick={() => this.input.current.click()}
							{...buttonProps}
						>
							{text ? text : "Загрузить файл"}
						</Button>
					}
				>
					{error}
				</Popup>

				<input
					type="file"
					hidden
					name="file-uploader"
					ref={this.input}
					accept={accept}
					onChange={this.handleChange}
				/>
			</React.Fragment>
		);
	};
}

FileUploader.propTypes = {
	onUrl: PropTypes.func.isRequired,
	fetcher: PropTypes.func.isRequired,
	buttonProps: PropTypes.object,
	accept: PropTypes.string,
	text: PropTypes.string
};

FileUploader.defaultProps = {
	buttonProps: null,
	accept: null,
	text: null
};

const FileUploaderWithAsyncSetState = withAsyncSetState(FileUploader);

const FileUploaderWithFetcherContext = props => (
	<FetcherContext.Consumer>
		{ctx => <FileUploaderWithAsyncSetState {...props} fetcher={ctx.fetcher} />}
	</FetcherContext.Consumer>
);

export default FileUploaderWithFetcherContext;
