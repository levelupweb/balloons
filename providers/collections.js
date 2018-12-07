import React from "react";
import PropTypes from "prop-types";
import { withAsyncSetState, deepEqual } from "@utils";

export const CollectionsContext = React.createContext();

class CollectionsProviderClass extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			collections: this.reflowCollections()
		};
	}

	componentDidUpdate = prevProps => {
		const { defaultCollections } = this.props;

		if (!deepEqual(defaultCollections, prevProps.defaultCollections)) {
			this.setState({
				collections: this.reflowCollections()
			});
		}
	};

	reflowCollections = () => {
		const { defaultCollections } = this.props;

		if (defaultCollections) {
			return {
				...(this.state && this.state.collections ? this.state.collections : {}),
				...Object.keys(defaultCollections).reduce(
					(prev, curr) => ({
						...prev,
						[curr]: defaultCollections[curr].reduce(
							(prev, curr) => ({
								...prev,
								[curr._id]: curr
							}),
							{}
						)
					}),
					{}
				)
			};
		}

		return {};
	};

	insertDocuments = (model, documents) => {
		const { collections } = this.state;

		return this.asyncSetState({
			collections: {
				...collections,
				[model]: {
					...(collections[model] || {}),
					...documents.reduce(
						(prev, curr) => ({ ...prev, [curr._id]: curr }),
						{}
					)
				}
			}
		});
	};

	updateDocument = (model, id, data) => {
		const { collections } = this.state;

		if (this.isDocumentExist(model, id)) {
			const keys = Object.keys(collections[model]);

			this.asyncSetState({
				collections: {
					...collections,
					[model]: keys.reduce((prev, curr) => {
						if (curr === id) {
							return {
								...prev,
								[curr]: {
									...collections[model][curr],
									...data
								}
							};
						}

						return {
							...prev,
							[curr]: collections[model][curr]
						};
					}, {})
				}
			});
		}

		return Promise.resolve();
	};

	isDocumentExist = (model, id) => {
		const { collections } = this.state;

		if (model && id) {
			return !!collections[model] && !!collections[model][id];
		}
		return false;
	};

	removeDocuments = (model, ids) => {
		const { collections } = this.state;

		if (!collections[model]) {
			return Promise.resolve();
		}

		return this.asyncSetState({
			collections: {
				...collections,
				[model]: Object.keys(collections[model]).reduce((prev, curr) => {
					if (ids.indexOf(curr) === -1) {
						return {
							...prev,
							[curr]: collections[model][curr]
						};
					}

					return prev;
				}, {})
			}
		});
	};

	getEntity = (model, id) => {
		const { collections } = this.state;

		if (collections[model]) {
			return collections[model][id];
		}

		return null;
	};

	render = () => (
		<CollectionsContext.Provider
			value={{
				collections: this.state.collections,
				insertDocuments: this.insertDocuments,
				updateDocument: this.updateDocument,
				removeDocuments: this.removeDocuments,
				getEntity: this.getEntity
			}}
		>
			{this.props.children}
		</CollectionsContext.Provider>
	);
}

CollectionsProviderClass.propTypes = {
	children: PropTypes.element.isRequired,
	defaultCollections: PropTypes.object
};

CollectionsProviderClass.defaultProps = {
	defaultCollections: {}
};

const CollectionsClassWithAsyncSetState = withAsyncSetState(
	CollectionsProviderClass
);

export const CollectionsProvider = CollectionsClassWithAsyncSetState;
