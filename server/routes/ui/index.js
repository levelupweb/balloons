import express from "express";
import { Article } from "@server/models";
import { createError } from "@server/utils";
import { ARTICLE_CATEGORY } from "@consts/article";
import { createMenu } from "./utils";

const router = express.Router();

router.get("/elements", (req, res, next) =>
	Article.find()
		.populate(ARTICLE_CATEGORY)
		.then(articles =>
			res.json({
				menu: createMenu(articles)
			})
		)
		.catch(error => next(createError("Не удалось загрузить страницу", error)))
);

export default router;
