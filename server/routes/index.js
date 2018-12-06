import express from "express";
import user from "./user";
import article from "./article";
import category from "./category";
import ui from "./ui";
import slide from "./slide";
import contact from "./contact";
import calculation from "./calculation";
import sale from "./sale";

const router = express.Router();

router.use("/user", user);
router.use("/article", article);
router.use("/category", category);
router.use("/ui", ui);
router.use("/slide", slide);
router.use("/contact", contact);
router.use("/calculation", calculation);
router.use("/sale", sale);

export default router;
