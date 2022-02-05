import * as dotenv from "dotenv";
import express from "express";
import mongodb from "mongodb";
import clientsRoutes from "./api/clients-routes";
import cors from "cors";
import ClientsDAO from "./dao/clientsDAO";

declare var process: {
	env: {
		MONGODB_URI: string;
	};
};
dotenv.config({ path: __dirname + "/../.env" });
const mongoClient = mongodb.MongoClient;

const app = express();

console.log(process.env.MONGODB_URI);

mongoClient
	.connect(process.env.MONGODB_URI)
	.catch((err) => {
		console.error(err.stack);
	})
	.then(async (client) => {
		await ClientsDAO.injectDB(client);
		app.listen(3000, () => console.log("Server started on port 3000"));
	});

app.use(cors());
app.use(express.json());
app.use("/api/v1/clients", clientsRoutes);
app.use("*", (req, res) => {
	res.status(404).json({ error: "not found" });
});
