const isClassComponent = component => {
	return typeof component === "function" &&
		!!component.prototype.isReactComponent
		? true
		: false;
};

const isFunctionComponent = component => {
	return typeof component === "function" &&
		String(component).includes("return React.createElement")
		? true
		: false;
};

export const isReactComponent = component => {
	return isClassComponent(component) || isFunctionComponent(component)
		? true
		: false;
};
