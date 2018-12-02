import colors from "colors";
import express from "express";
import morgan from "morgan";
import next from "next";
import routes from "@server/routes";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { createMongooseConnection } from "./db";
import { getEnvConfig } from "@utils";
import { logger } from "./logger";
import { error } from "@server/middlewares";

const envConfig = getEnvConfig(process.env.NODE_ENV);

const dev = process.env.NODE_ENV !== "production";

const app = next({ dev });
const handle = app.getRequestHandler();

export default dirname =>
	createMongooseConnection().then(() =>
		app.prepare().then(() => {
			const server = express();

			server.use(bodyParser.urlencoded({ extended: true }));
			server.use(
				morgan("combined", {
					stream: logger.stream,
					skip: req =>
						!req.path.indexOf("/_next") || !req.path.indexOf("static")
				})
			);

			server.use(cookieParser());
			server.use("/api", routes);
			server.use("/api", error);

			server.use("/static", express.static(dirname + "/.next/static"));
			server.get("*", (req, res) => handle(req, res));

			server.listen(envConfig.port, err => {
				if (err) {
					throw new Error(err);
				}

				// eslint-disable-next-line no-console
				console.log(
					colors.cyan(`Сервер запущен по следующему адресу: ${envConfig.url}`)
				);
			});
		})
	);
