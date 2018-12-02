import express from "express";
import user from "./user";
import article from "./article";
import category from "./category";

const router = express.Router();

router.use("/user", user);
router.use("/article", article);
router.use("/category", category);

export default router;
