import * as dotenv from "dotenv";
import express from "express";
import { MongoClient, ServerApiVersion } from "mongodb";
import clientsRoutes from "./api/clients-routes";
import ordersRoutes from "./api/orders-routes";
import usersRoutes from "./api/users-routes";
import cors from "cors";
import ClientsDAO from "./dao/clientsDAO";
import OrdersDAO from "./dao/ordersDAO";
import UsersDAO from "./dao/userDAO";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

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
		await UsersDAO.injectDB(connection);
		app.listen(5001, () => console.log("Server started on port 5001"));
	});

app.use(cors());

app.use(bodyParser.json());
app.use(cookieParser());
app.use("/api/v1/clients", clientsRoutes);
app.use("/api/v1/orders", ordersRoutes);
app.use("/api/v1/users", usersRoutes);
app.use("*", (req, res) => {
	res.status(404).json({ error: "not found" });
});
