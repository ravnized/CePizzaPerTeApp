import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;
let clients: any;

export default class ClientsDAO {
	static async injectDB(conn: any) {
		if (clients) return;
		try {
			clients = await conn.db(process.env.CLIENTS).collection("clients");
			console.log("Clients collection initialized");
		} catch (e) {
			console.error(`unable to enstablish a collection handle ${e}`);
		}
	}
	static async getClients({
		filters = null,
		page = 0,
		clientsPerPage = 10,
	} = {}): Promise<any> {
		try {
			let query: any = {};
			if (filters) {
				if ("name" in filters) {
					query = { $text: { $search: filters["name"] } };
				} else if ("adress" in filters) {
					query = { adress: { $eq: filters["adress"] } };
				} else if ("cellphone" in filters) {
					query = { cellphone: { $eq: filters["cellphone"] } };
				}
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
				console.error(
					`Unable to convert cursor to array or problem counting documents, ${e}`,
				);
				return { clientsList: [], totalClientsList: 0 };
			}
		} catch (e) {
			console.error(`unable to get clients ${e}`);
		}
	}
	static async getClientByid(id: string) {
		try {
			const pipeline = [
				{
					$match: {
						_id: new ObjectId(id),
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
			];
			return await clients.aggregate(pipeline).next();
		} catch (e) {
			console.error(`Something went wrong in getClientById: ${e}`);
			throw e;
		}
	}
}
