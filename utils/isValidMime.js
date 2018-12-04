const available = ["image/jpeg", "image/png", "image/svg+xml"];

export const isValidMime = extension => available.indexOf(extension) !== -1;

export default isValidMime;
