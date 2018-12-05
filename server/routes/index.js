import express from "express";
import user from "./user";
import article from "./article";
import category from "./category";
import ui from "./ui";
import slide from "./slide";
import contact from "./contact";

const router = express.Router();

router.use("/user", user);
router.use("/article", article);
router.use("/category", category);
router.use("/ui", ui);
router.use("/slide", slide);
router.use("/contact", contact);

export default router;
