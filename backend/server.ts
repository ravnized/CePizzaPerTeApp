import * as dotenv from "dotenv";
import express from "express";
import { MongoClient, ServerApiVersion } from "mongodb";
import clientsRoutes from "./api/clients-routes";
import ordersRoutes from "./api/orders-routes";
import cors from "cors";
import ClientsDAO from "./dao/clientsDAO";
import OrdersDAO from "./dao/ordersDAO";

declare var process: {
	env: {
		MONGODB_URI: string;
	};
};
dotenv.config({ path: __dirname + "/../.env" });
const mongoClient = MongoClient;

const app = express();

mongoClient
	.connect(process.env.MONGODB_URI)
	.catch((err) => {
		console.error(err.stack);
	})
	.then(async (connection) => {
		await ClientsDAO.injectDB(connection);
		await OrdersDAO.injectDB(connection);
		app.listen(3000, () => console.log("Server started on port 3000"));
	});

app.use(cors());
app.use(express.json());
app.use("/api/v1/clients", clientsRoutes);
app.use("/api/v1/orders", ordersRoutes);
app.use("*", (req, res) => {
	res.status(404).json({ error: "not found" });
});
