import express from "express";
import {fetchUsers, login, register, updateUser} from "../controller/userController.js";

const router = express.Router()

router.patch("/:id", updateUser);
router.get("/", fetchUsers);
router.post("/login", login);
router.post("/register", register);

export default router