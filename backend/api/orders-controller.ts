import mongoose from "mongoose";
import OrdersDAO from "../dao/ordersDAO";
export default class OrdersController {
	static async apiGetOrder(req: any, res: any, next: any) {
		const ordersPerPage = req.query.ordersPerPage
			? parseInt(req.query.ordersPerPage, 10)
			: 20;
		const page = req.query.page ? parseInt(req.query.page, 10) : 0;

		let filters: any = {};
		if (req.query.date) {
			filters.date = req.query.date;
		} else if (req.query.cost) {
			filters.cost = req.query.cost;
		} else if (req.query.JustEat) {
			filters.JustEat = req.query.JustEat;
		} else if (req.query.Deliveroo) {
			filters.Deliveroo = req.query.Deliveroo;
		}

		const { ordersList, totalOrderList } = await OrdersDAO.getOrders({
			filters,
			page,
			ordersPerPage,
		});

		let response = {
			orders: ordersList,
			page: page,
			filters: filters,
			entries_per_page: ordersPerPage,
			total_results: totalOrderList,
		};
		res.json(response);
	}

	static async apiInsertOrder(req: any, res: any, next: any) {
		let clientId: any,
			date = new Date(),
			cost = 0,
			JustEat = false,
			JustEat_order = "",
			Deliveroo = false,
			Deliveroo_order = "",
			pizze_ordinate: any;
		let insertOrderResponse: any;
		let query: any = null;
		try {
			query = req.body;
		} catch (e) {
			console.error(`Can't retrive request.body ${e}`);
		}

		clientId = new mongoose.Types.ObjectId(query.clientId);
		date = query.date;
		cost = query.cost;
		JustEat = query.JustEat;
		JustEat_order = query.JustEat_order;
		Deliveroo = query.Deliveroo;
		Deliveroo_order = query.Deliveroo_order;
		pizze_ordinate = new mongoose.Types.Array(query.pizze_ordinate);
		try {
			insertOrderResponse = await OrdersDAO.insertOrder({
				clientId: clientId,
				date: date,
				cost: cost,
				JustEat: JustEat,
				JustEat_order: JustEat_order,
				Deliveroo: Deliveroo,
				Deliveroo_order: Deliveroo_order,
				pizze_ordinate: pizze_ordinate,
			});
		} catch (e) {
			console.error(`Problem in inserting order ${e}`);
		}

		res.json(insertOrderResponse);
	}
}
