import React, { useState, useLayoutEffect } from "react";
import OrdersDataService from "../services/ordersService";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import gsap from "gsap";
import { CSSPlugin } from "gsap/CSSPlugin";

import pizzaImage from "../assets/images/pizza.jpeg";
import "./main.css";
import { Link, useNavigate } from "react-router-dom";
gsap.registerPlugin(CSSPlugin);

const Orders = ({ isAutenticated }: any) => {
	let navigate = useNavigate();
	if (!isAutenticated) {
		navigate("/");
	}

	let [orders, setOrders] = useState([]);

	let [tl3] = useState(gsap.timeline());

	function getAll(): Promise<boolean> {
		OrdersDataService.getAll()
			.then((res) => {
				setOrders(res.data.orders);
				return Promise.resolve(true);
			})
			.catch((e) => {
				console.error(e);
			});
		return Promise.resolve(false);
	}

	function onEnter(index: any) {
		gsap.to(`#cardEl${index}`, 0.5, { scale: 1.1, transformOrigin: "50% 50%" });
	}
	function onExit(index: any) {
		gsap.to(`#cardEl${index}`, 0.5, { scale: 1, transformOrigin: "50% 50%" });
	}

	useLayoutEffect(() => {
		getAll();
	}, []);

	return (
		<div className="allCards">
			{orders ? (
				<Container>
					<Row lg={3} xs={1} md={2}>
						{orders.map((order: any, index: number) => (
							<div
								className="cardElement"
								key={index}
								id={`cardEl${index}`}
								onMouseEnter={(e) => {
									onEnter(index);
								}}
								onMouseLeave={(e) => {
									onExit(index);
								}}
								onLoad={(e) => {
									tl3.to(
										`#cardEl${index}`,
										{ opacity: 1, y: 0, duration: 0.5 },
										`0.${index}`,
									);
								}}
							>
								<Col className="colomnTop">
									<Link to={`/order?id=${order._id}`} state={{ order }}>
										<Card>
											<Card.Img variant="top" src={pizzaImage} />
											<Card.Body>
												<Card.Title>Order n: {order._id}</Card.Title>
												<Card.Text>
													{order.Deliveroo ? "Con Deliveroo " : ""}
													<br />
													{order.JustEat ? "Con JustEat" : ""}
													<br />
													Costo: {order.cost}
												</Card.Text>
											</Card.Body>
										</Card>
									</Link>
								</Col>
							</div>
						))}
					</Row>
				</Container>
			) : (
				<Container>
					<h5>Non ci sono Ordini :(</h5>
				</Container>
			)}
		</div>
	);
};

export default Orders;
