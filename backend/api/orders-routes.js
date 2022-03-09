"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var orders_controller_1 = __importDefault(require("./orders-controller"));
var router = express_1.default.Router();
router.route("/").get(orders_controller_1.default.apiGetOrder);
router.route("/").post(orders_controller_1.default.apiInsertOrder);
router.route("/").update(orders_controller_1.default.apiInsertOrder);
exports.default = router;
