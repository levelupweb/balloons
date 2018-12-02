export const createError = (message, error) => ({
	message,
	error: error || new Error(message)
});

export default createError;
