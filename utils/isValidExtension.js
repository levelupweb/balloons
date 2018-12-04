const available = ["svg", "png", "gif"];

export const isValidExtension = extension =>
	available.indexOf(extension) !== -1;

export default isValidExtension;
