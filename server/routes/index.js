import express from "express";
import user from "./user";

const router = express.Router();

// router

router.use("/user", user);

export default router;
