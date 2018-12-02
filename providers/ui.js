// import React from "react";
// import PropTypes from "prop-types";
// import { withAsyncSetState } from "@utils";
// import { fetchUI } from "@fetch/common";

// export const UIContext = React.createContext();

// class UIProviderClass extends React.Component {
// 	state = {
// 		isHydrating: false,
// 		isFetched: false,
// 		error: null,
// 		elements: {
// 			navigation: null
// 		}
// 	};

// 	componentDidMount = () => {
// 		this.fetchUIIfNeeded();
// 	};

// 	fetchUIIfNeeded = () => {
// 		const { isFetched } = this.state;

// 		if (!isFetched) {
// 			return this.asyncSetState({
// 				isHydrating: true,
// 				error: null,
// 				elements: {}
// 			}).then(() => fetchUI()).then(() => )
// 		}

// 		return Promise.resolve();
// 	};

// 	render = () => (
// 		<UIContext.Provider
// 			value={{
// 				isHydrating: this.state.isHydrating,
// 				error: this.state.error,
// 				elements: this.state.elements
// 			}}
// 		>
// 			{this.props.children}
// 		</UIContext.Provider>
// 	);
// }

// UIProviderClass.propTypes = {
// 	children: PropTypes.any.isRequired
// };

// const UIProviderClassWithAsyncSetState = withAsyncSetState(UIProviderClass);

// export const UIProvider = UIProviderClassWithAsyncSetState;
