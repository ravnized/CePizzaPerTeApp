import React, { useLayoutEffect, useRef, useState } from "react";
import OrdersDataService from "../services/ordersService";
import gsap from "gsap";
import { CSSPlugin } from "gsap/CSSPlugin";
import { useLocation } from "react-router";
import { Card } from "react-bootstrap";
import "./main.css";
import "./css/order.css";
import { createBrowserHistory } from "history";
import { useNavigate } from "react-router-dom";
let history = createBrowserHistory();
gsap.registerPlugin(CSSPlugin);
const Order = ({ isAutenticated }: any) => {
	let navigate = useNavigate();
	if (!isAutenticated) {
		navigate("/");
	}
	let orderIntialState = {
		_id: "",
		client_id: null,
		date: null,
		cost: 0,

		JustEat: false,
		JustEat_order: "",
		Deliveroo: false,
		Deliveroo_order: "",
		pizze_ordinate: [],
	};

	let [order, setOrder] = useState(orderIntialState);
	let data: any;
	let location = useRef("");
	data = useLocation();
	function find(query: string) {
		OrdersDataService.findQuery(query)
			.then((res) => {
				setOrder(res.data.orders[0]);
			})
			.catch((e) => {
				console.error(e);
			});
	}

	useLayoutEffect(() => {
		if (data.state != null) {
			setOrder(data.state.order);
		}
		if (order._id === "") {
			location.current = history.location.search;
			find(location.current);
		}

		//getAll();
	}, [data.state, order._id]);
	/*
	if (order._id === undefined) {
		return <Navigate to="/" />;
	}
    */
	return (
		<div className="App">
			<Card>
				<Card.Body>
					<Card.Title>Order n: {order._id}</Card.Title>
					<Card.Text>
						Nome Cliente:
						{order.client_id !== undefined
							? `${order.client_id}`
							: "non registrato"}{" "}
						<br />
						Data:
						{order.date} <br />
						Costo:
						{`${order.cost} $`} <br />
						Deliveroo:
						{order.Deliveroo
							? ` Si Ordine n: ${order.Deliveroo_order}`
							: " No"}{" "}
						<br />
						JustEat:
						{order.JustEat ? ` Si Ordine n: ${order.JustEat_order}` : " No"}
						<br />
					</Card.Text>
				</Card.Body>
			</Card>
		</div>
	);
};

export default Order;
