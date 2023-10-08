import { login } from "../controllers";
import express from "express";

const router = express.Router();

router.post("/", login);

export { router as login };
