"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var users_controls_1 = __importDefault(require("./users-controls"));
var userValidator_1 = __importDefault(require("./middlewares/userValidator"));
var router = express_1.default.Router();
router.route("/signUp").post(userValidator_1.default, users_controls_1.default.apiSignup);
router.route("/signIn").post(users_controls_1.default.apiLogin);
router.route("/signOut").get(users_controls_1.default.apiSignOut);
exports.default = router;
