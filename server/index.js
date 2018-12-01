import colors from "colors";
import express from "express";
import next from "next";
import cookieParser from "cookie-parser";
import { getEnvConfig } from "../utils";

const envConfig = getEnvConfig(process.env.NODE_ENV);

const dev = process.env.NODE_ENV !== "production";

const app = next({ dev });
const handle = app.getRequestHandler();

export default dirname =>
	app.prepare().then(() => {
		const server = express();

		server.use(cookieParser());
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
	});
