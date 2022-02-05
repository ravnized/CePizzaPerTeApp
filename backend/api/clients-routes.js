"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var clients_controller_1 = __importDefault(require("./clients-controller"));
var router = express_1.default.Router();
router.route("/").get(clients_controller_1.default.apiGetClient);
router.route("/id/").get(clients_controller_1.default.apiGetClientById);
exports.default = router;
