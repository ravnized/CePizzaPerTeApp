import mongoose from "mongoose";
let orders: any;
interface filtersArray {
	[key: string]: string | number;
}
interface orderObject {
	id: mongoose.Types.ObjectId;
	aggiunte: [mongoose.Types.ObjectId];
	note: string;
}

interface orderInterface extends Array<orderObject> {}

export default class OrdersDAO {
	static async injectDB(conn: any) {
		if (orders) return;
		try {
			orders = await conn.db("Main").collection("Ordini");
			console.log(`Ordini collection initialized`);
		} catch (e) {
			console.error(`unable to enstablish a collection handle ${e}`);
		}
	}

	static async getOrders({
		filters = {} as filtersArray,
		page = 0,
		ordersPerPage = 10,
	} = {}): Promise<any> {
		let _id = "",
			client_id = "",
			cost = 0,
			JustEat = false,
			JustEat_order = "",
			Deliveroo = false,
			Deliveroo_order = "";

		try {
			let query: any = {
				_id,
				client_id,
				cost,
				JustEat,
				JustEat_order,
				Deliveroo,
				Deliveroo_order,
			};
			for (let querySingle in query) {
				query[querySingle] = { $eq: filters[querySingle] };
				if (filters[querySingle] == undefined) {
					delete query[querySingle];
				}
			}
			console.error(query);

			let cursor: any;
			try {
				cursor = await orders.find(query);
			} catch (e) {
				console.error(`Unable to issue find command, ${e}`);
				return { ordersList: 0, totalOrderList: 0 };
			}
			const displayCursor = cursor
				.limit(ordersPerPage)
				.skip(ordersPerPage * page);
			try {
				const ordersList = await displayCursor.toArray();

				const totalOrderList = await orders.countDocuments(query);
				return { ordersList, totalOrderList };
			} catch (e) {
				console.log(
					`Unable to convert cursor to array or problem counting documents, ${e}`,
				);
				return { ordersList: [], totalOrderList: 0 };
			}
		} catch (e) {
			console.log(`unable to get clients ${e}`);
		}
	}

	static async insertOrder({
		clientId = "",
		date = new Date(),
		cost = 0,
		JustEat = false,
		JustEat_order = "",
		Deliveroo = false,
		Deliveroo_order = "",
		pizze_ordinate = [],
	} = {}): Promise<any> {
		let order: any;
		let cursor: any;

		console.error(clientId);

		order = {
			clientId,
			date,
			cost,
			JustEat,
			JustEat_order,
			Deliveroo,
			Deliveroo_order,
			pizze_ordinate,
		};

		try {
			console.log(order);
			cursor = orders.insertOne(order);
			return cursor;
		} catch (e) {
			console.log(`Unable to insert order, ${e}`);
			return (order = {});
		}
	}
}
