import express from "express";
import UsersController from "./users-controls";
import validateUser from "./middlewares/userValidator";
const router = express.Router();
router.route("/signUp").post(validateUser, UsersController.apiSignup);
router.route("/signIn").post(UsersController.apiLogin);
router.route("/signOut").get(UsersController.apiSignOut);

export default router;
