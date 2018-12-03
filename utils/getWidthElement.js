export const getWidthElement = (element, withMargin = false) => {
	let width;

	// Prevent SSR
	if (document) {
		if (document.all) {
			// IE
			width = element.currentStyle.width;
		} else {
			// Mozilla
			width = document.defaultView
				.getComputedStyle(element, "")
				.getPropertyValue("width");
		}

		if (withMargin) {
			const style = element.currentStyle || window.getComputedStyle(element);
			const margin =
				parseFloat(style.marginLeft) + parseFloat(style.marginRight);

			return Number.parseInt(margin) + Number.parseInt(width.slice(0, -2));
		}

		return +width.slice(0, -2);
	}
	return 0;
};

export default getWidthElement;
