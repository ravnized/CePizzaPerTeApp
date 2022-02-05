import express from "express";
import ClientsController from "./clients-controller";

const router = express.Router();
router.route("/").get(ClientsController.apiGetClient);
router.route("/id/").get(ClientsController.apiGetClientById);
export default router;
