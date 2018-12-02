import { getDisplayName, isReactComponent } from ".";

export const withAsyncSetState = Component => {
	if (isReactComponent(Component)) {
		class WithAsyncSetState extends Component {
			asyncSetState = state =>
				new Promise(resolve => {
					this.setState(state, (...args) => {
						resolve(args);
					});
				});
		}

		WithAsyncSetState.displayName = `WithAsyncSetState(${getDisplayName(
			Component
		)})`;
		return WithAsyncSetState;
	}
	return Component;
};

export default withAsyncSetState;
