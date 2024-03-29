import mongoose, { mongo } from "mongoose";
import OrdersDAO from "../dao/ordersDAO";

var OrderSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	client_id: mongoose.Schema.Types.ObjectId,
	date: mongoose.Schema.Types.Date,
	cost: mongoose.Schema.Types.Number,
	JustEat: mongoose.Schema.Types.Boolean,
	JustEat_order: mongoose.Schema.Types.String,
	Deliveroo: mongoose.Schema.Types.Boolean,
	Deliveroo_order: mongoose.Schema.Types.String,
	Pizze_Ordinate: [
		{
			id: mongoose.Schema.Types.ObjectId,
			aggiunte: [mongoose.Schema.Types.ObjectId],
			note: mongoose.Schema.Types.String,
		},
	],
});
export default class OrdersController {
	static async apiGetOrder(req: any, res: any, next: any) {
		const ordersPerPage = req.query.ordersPerPage
			? parseInt(req.query.ordersPerPage, 10)
			: 20;
		const page = req.query.page ? parseInt(req.query.page, 10) : 0;

		let filters: any = {};
		if (req.query.id) {
			filters._id = new mongoose.Types.ObjectId(req.query.id);
		}
		if (req.query.client_id) {
			filters.client_id = new mongoose.Types.ObjectId(req.query.client_id);
		}
		if (req.query.date) {
			filters.date = new Date(req.query.date);
		}
		if (req.query.cost) {
			filters.cost = parseFloat(req.query.cost);
		}
		if (req.query.JustEat == "") {
			filters.JustEat = true;
		} else if (req.query.JustEat == false) {
			filters.Deliveroo = false;
		}
		if (req.query.JustEat_order) {
			filters.JustEat = req.query.JustEat_order;
		}
		if (req.query.Deliveroo == "") {
			filters.Deliveroo = true;
		} else if (req.query.Deliveroo == false) {
			filters.Deliveroo = false;
		}
		if (req.query.Deliveroo_order) {
			filters.Deliveroo_order = req.query.Deliveroo_order;
		}

		console.error(req.query);
		console.error(filters);

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

		clientId = query.clientId;
		date = query.date;
		cost = query.cost;
		JustEat = query.JustEat;
		JustEat_order = query.JustEat_order;
		Deliveroo = query.Deliveroo;
		Deliveroo_order = query.Deliveroo_order;
		pizze_ordinate = query.pizze_ordinate;
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
