import React from "react";
import PropTypes from "prop-types";
import Button from "@components/Button";
import { withAsyncSetState, parseError, fetch } from "@utils";
import { FetcherContext } from "@providers";
import Icon from "@components/Icon";
import Margin from "@components/Margin";
import { Paragraph } from "@components/Typography";
import { BUTTON_VARIANT_PRIMARY } from "@components/Button/consts";
import { FETCH_FILE_UPLOAD } from "@consts/_fetch";
import styles from "./styles";

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

		return (
			<div className={styles.uploader}>
				<Button
					variant={BUTTON_VARIANT_PRIMARY}
					loading={isUploading}
					onClick={() => this.input.current.click()}
				>
					Загрузить файл
				</Button>
				{error && (
					<Margin top half>
						<div className={styles.error}>
							<Paragraph className={styles.content}>{error}</Paragraph>
							<button onClick={this.hideError} className={styles.close}>
								<Icon icon="close" size={17} />
							</button>
						</div>
					</Margin>
				)}
				<input
					type="file"
					hidden
					name="file-uploader"
					ref={this.input}
					onChange={this.handleChange}
				/>
			</div>
		);
	};
}

FileUploader.propTypes = {
	onUrl: PropTypes.func.isRequired,
	fetcher: PropTypes.func.isRequired
};

const FileUploaderWithAsyncSetState = withAsyncSetState(FileUploader);

const FileUploaderWithFetcherContext = props => (
	<FetcherContext.Consumer>
		{ctx => <FileUploaderWithAsyncSetState {...props} fetcher={ctx.fetcher} />}
	</FetcherContext.Consumer>
);

export default FileUploaderWithFetcherContext;
