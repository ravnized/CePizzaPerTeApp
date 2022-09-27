import React from "react";
import httpCommon from "../http-common";

class OrdersDataService {
	static getAll(page = 0) {
		return httpCommon.get(`?page=${page}`);
	}

	static find(query: number, by = "cost", page = 0) {
		return httpCommon.get(`?${by}=${query}&page=${page}`);
	}

	static findById(query: string, by = "id") {
		console.log(`?${by}=${query}`);
		return httpCommon.get(`?${by}=${query}`);
	}
	static findQuery(query: string) {
		return httpCommon.get(query);
	}
}

export default OrdersDataService;
