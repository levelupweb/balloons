import colors from "colors";
import express from "express";
import morgan from "morgan";
import formidable from "formidable";
import next from "next";
import routes from "@server/routes";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { createMongooseConnection } from "./db";
import { getEnvConfig, isValidMime } from "@utils";
import { parseExtension, createError } from "@server/utils";
import { error } from "@server/middlewares";
import { logger } from "./logger";

const envConfig = getEnvConfig(process.env.NODE_ENV);

const dev = process.env.NODE_ENV !== "production";

const app = next({ dev });
const handle = app.getRequestHandler();

export default dirname =>
	createMongooseConnection().then(() =>
		app.prepare().then(() => {
			const server = express();

			server.use(bodyParser.json());
			server.use(
				morgan("combined", {
					stream: logger.stream,
					skip: req =>
						!req.path.indexOf("/_next") || !req.path.indexOf("static")
				})
			);

			server.use(cookieParser());

			server.post("/api/image", (req, res, next) => {
				const form = new formidable.IncomingForm();
				const timestamp = new Date().getTime();

				let filename = timestamp;
				let shouldResponse = true;

				form.parse(req);
				form.maxFileSize = 200 * 1024 * 1024;

				form.on("fileBegin", (_, file) => {
					const extension = parseExtension(file.name);
					if (!isValidMime(file.type)) {
						form._error("Неверный формат файла");
						shouldResponse = false;
						return;
					}

					filename = `${timestamp}.${extension}`;
					file.path = __dirname + "/uploads/" + filename;
				});

				form.on("error", err => {
					shouldResponse = false;

					if (typeof err === "string") {
						return next(createError(err));
					}

					next(createError("Не удалось загрузить файл", err));
				});

				form.on("end", () => {
					if (shouldResponse) {
						res.json({
							url: filename
						});
					}
				});
			});

			server.use("/api", routes);
			server.use("/api", error);
			server.use("/storage", express.static(__dirname + "/uploads"));
			server.use("/static", express.static(dirname + "/.next/static"));
			server.use("/semantic", express.static(dirname + "/semantic/dist"));

			server.get("/article/:slug", (req, res) => {
				return app.render(req, res, "/article", {
					slug: req.params.slug,
					edit: req.query.edit
				});
			});

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
