import express from "express";
import { auth, validation } from "@server/middlewares";
import { createError } from "@server/utils";
import { Slide } from "@server/models";
import { createValidation, updateValidation } from "./middlewares";

const router = express.Router();

router.post(
	"/create",
	[auth(), createValidation, validation],
	(req, res, next) =>
		Slide.create(req.matchedData)
			.then(slide => res.json(slide))
			.catch(error =>
				next(createError("Не удалось создать новый слайд", error))
			)
);

router.get("/entry", (req, res, next) =>
	Slide.findById(req.query.slideId)
		.then(slide => {
			if (!slide || !slide._id) {
				return next(createError("Слайд не был найден в базе данных"));
			}
			return res.json(slide);
		})
		.catch(error => next(createError("Не удалось найти слайд", error)))
);

router.get("/entries", (req, res, next) =>
	Slide.find({})
		.then(slides => res.json(slides))
		.catch(error => next(createError("Не удалось найти слайды", error)))
);

router.delete("/entry", [auth()], (req, res, next) =>
	Slide.findById(req.query.slideId).then(slide => {
		if (!slide || !slide._id) {
			return next(createError("Слайд не был найден в базе данных"));
		}

		return Slide.findByIdAndRemove(req.query.slideId)
			.then(slide => res.json(slide))
			.catch(error => createError("Не удалось удалить слайд", error));
	})
);

router.put("/entry", [auth(), updateValidation, validation], (req, res, next) =>
	Slide.findById(req.query.slideId).then(slide => {
		if (!slide || !slide._id) {
			return next(createError("Слайд не был найден в базе данных"));
		}

		return Slide.findByIdAndUpdate(req.query.slideId, req.matchedData, {
			new: true
		})
			.then(slide => res.json(slide))
			.catch(error => createError("Не удалось обновить слайд", error));
	})
);

export default router;
