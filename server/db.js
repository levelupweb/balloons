import mongoose from "mongoose";

const options = {
	poolSize: 5,
	reconnectInterval: 2000,
	connectTimeoutMS: 30000,
	keepAlive: true,
	keepAliveInitialDelay: 30000,
	reconnectTries: Number.MAX_VALUE,
	user: process.env.DB_USER,
	pass: process.env.DB_PASSWORD,
	promiseLibrary: Promise,
	useNewUrlParser: true
};

const handleConnectionSuccess = db => {
	// eslint-disable-next-line no-console
	console.log("[SERVER] Соединение с базой данных установлено".green);
	Promise.resolve(db);
};

const handleConnectionFail = err => {
	// eslint-disable-next-line no-console
	console.log("[SERVER] Соединение с базой данных не произошло".red);
	// eslint-disable-next-line no-console
	console.log("[SERVER] Отчёт об ошибке: ".red);
	// eslint-disable-next-line no-console
	console.log(err);
};

export const createMongooseConnection = () =>
	mongoose
		.connect(
			`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${
				process.env.DB_DB
			}`,
			options
		)
		.then(next => {
			mongoose.set("useCreateIndex", true);
			return next;
		})
		.then(handleConnectionSuccess)
		.catch(handleConnectionFail);

/**
 * Default export is mongoose instance
 * It may be connected or not
 *
 * It depends on where craeteMongooseConnection
 * invoked
 */
