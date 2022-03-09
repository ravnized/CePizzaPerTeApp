import express from "express";
import OrdersController from "./orders-controller";

const router = express.Router();
router.route("/").get(OrdersController.apiGetOrder);
router.route("/").post(OrdersController.apiInsertOrder);
//router.route("/").delete(OrdersController.apiInsertOrder);
export default router;
