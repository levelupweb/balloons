import winston from "winston";
import path from "path";

const options = {
	file: {
		level: "info",
		filename: path.join(__dirname, "/logs/app.log"),
		handleExceptions: true,
		json: true,
		maxsize: 10242880, // 10MB
		maxFiles: 5,
		colorize: false
	},
	console: {
		level: "debug",
		handleExceptions: true,
		json: false,
		colorize: true
	}
};

export const logger = winston.createLogger({
	transports: [
		new winston.transports.File(options.file),
		new winston.transports.Console(options.console)
	],
	exitOnError: false
});

logger.stream = {
	write: message => {
		logger.info(message);
	}
};

export default logger;
