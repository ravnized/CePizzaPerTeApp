import mongoose from "mongoose";
let clients: any;
interface filtersArray {
	[key: string]: string | number;
}
export default class ClientsDAO {
	static async injectDB(conn: any) {
		if (clients) return;
		try {
			clients = await conn.db("Main").collection("Clienti");
			console.log(`Clients collection initialized`);
		} catch (e) {
			console.error(`unable to enstablish a collection handle ${e}`);
		}
	}
	static async getClients({
		filters = {} as filtersArray,
		page = 0,
		clientsPerPage = 10,
	} = {}): Promise<any> {
		try {
			let query: any = {};

			if ("name" in filters) {
				query = { name: { $eq: filters["name"] } };
			} else if ("adress" in filters) {
				query = { adress: { $eq: filters["adress"] } };
			} else if ("cellphone" in filters) {
				query = { cellphone: { $eq: filters["cellphone"] } };
			}

			let cursor: any;
			try {
				cursor = await clients.find(query);
			} catch (e) {
				console.error(`Unable to issue find command, ${e}`);
				return { clientsList: 0, totalClientsList: 0 };
			}
			const displayCursor = cursor
				.limit(clientsPerPage)
				.skip(clientsPerPage * page);
			try {
				const clientsList = await displayCursor.toArray();
				const totalClientsList = await clients.countDocuments(query);
				return { clientsList, totalClientsList };
			} catch (e) {
				console.log(
					`Unable to convert cursor to array or problem counting documents, ${e}`,
				);
				return { clientsList: [], totalClientsList: 0 };
			}
		} catch (e) {
			console.log(`unable to get clients ${e}`);
		}
	}
	static async getClientByid(id: string) {
		try {
			console.log(`getting client with id ${id}`);
			const pipeline = [
				{
					$match: {
						_id: new mongoose.Types.ObjectId(id),
					},
				},
				{
					$lookup: {
						from: "Ordini",
						localField: "string",
						foreignField: "string",
						as: "ordini_effettuati",
					},
				},
				{
					$lookup: {
						from: "Pizze",
						localField: "string",
						foreignField: "string",
						as: "pizze_ordinate",
					},
				},
			];
			return await clients.aggregate(pipeline).next();
		} catch (e) {
			console.error(`Something went wrong in getClientById: ${e}`);
			throw e;
		}
	}
}
