import mongoose from "mongoose";
let orders: any;
interface filtersArray {
	[key: string]: string | number;
}
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
		try {
			let query: any = {};
			if ("date" in filters) {
				query = { date: { $eq: filters["date"] } };
			} else if ("cost" in filters) {
				query = { adress: { $eq: filters["cost"] } };
			} else if ("JustEat" in filters) {
				query = { JustEat: { $eq: filters["JustEat"] } };
			} else if ("Deliveroo" in filters) {
				query = { Deliveroo: { $eq: filters["Deliveroo"] } };
			}

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
		clientId = new mongoose.Types.ObjectId(),
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
		let pizzeArray = [];
		for (let pizze in pizze_ordinate) {
			
			pizzeArray.push(new mongoose.Types.ObjectId(pizze_ordinate[pizze]));
		}
	
		order = {
			clientId,
			date,
			cost,
			JustEat,
			JustEat_order,
			Deliveroo,
			Deliveroo_order,
			pizzeArray,
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
