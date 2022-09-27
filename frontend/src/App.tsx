import React, { useEffect, useState } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import "./App.css";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Orders from "./components/orders";
import Login from "./components/login";
import Order from "./components/order";
import Logout from "./components/logout";
import ProtectedRoute from "./components/protectedRoute";

function App() {
	let [email, setEmail] = useState("");
	let [password, setPassword] = useState("");
	let [isAutenticated, setIsAutenticated] = useState(false);
	let [name, setName] = useState("");
	let [lastName, setLastName] = useState("");
	const [show, setShow] = useState(false);
	let [protectedRouteVerify, setProtectedRouteVerify] = useState(false);
	let getLogin = (loginData: any) => {
		setEmail(loginData.email);
		setPassword(loginData.password);
		setIsAutenticated(loginData.isAutenticated);
		setName(loginData.name);
		setLastName(loginData.lastName);
	};

	let getProtectedRouteVerify = (protectedRouteVerify: any) => {
		setProtectedRouteVerify(protectedRouteVerify);
	};

	const toggleOffCanvas = () => {
		setShow((show) => !show);
	};

	function parseString(value: string) {
		return localStorage.getItem(value) === "true";
	}

	useEffect(() => {
		if (isAutenticated && parseString("isAutenticated") === false) {
			localStorage.setItem("email", email);
			localStorage.setItem("password", password);
			localStorage.setItem("isAutenticated", isAutenticated.toString());
			localStorage.setItem("name", name);
			localStorage.setItem("lastName", lastName);
		} else if (!isAutenticated && parseString("isAutenticated") === true) {
			setEmail(localStorage.getItem("email") || "");
			setPassword(localStorage.getItem("password") || "");
			setIsAutenticated(parseString("isAutenticated"));
			setName(localStorage.getItem("name") || "");
			setLastName(localStorage.getItem("lastName") || "");
		}
		console.log("isAutenticated: " + isAutenticated);
		console.log("email: " + email);
		console.log("password: " + password);
		console.log("name: " + name);
		console.log("lastName: " + lastName);
		console.log("protectedRouteVerify: " + protectedRouteVerify);
	}, [email, isAutenticated, lastName, name, password]);

	return (
		<div className="App">
			<Navbar bg="light" expand={false} collapseOnSelect>
				<Container fluid>
					<Link to="/">
						<Navbar.Brand>C'e' pizza per te</Navbar.Brand>
					</Link>
					<Navbar.Toggle
						onClick={toggleOffCanvas}
						aria-controls="offcanvasNavbar"
					/>
					<Navbar.Offcanvas
						id="offcanvasNavbar"
						aria-labelledby="offcanvasNavbarLabel"
						placement="end"
						show={show}
						onHide={toggleOffCanvas}
					>
						{isAutenticated ? (
							<Link to="/preLogout" onClick={toggleOffCanvas}>
								<Button variant="outline-primary">logout</Button>
							</Link>
						) : (
							<Link to="/login" onClick={toggleOffCanvas}>
								<Button variant="outline-primary">Log In</Button>
							</Link>
						)}
					</Navbar.Offcanvas>
				</Container>
			</Navbar>
			<div className="Main">
				<div className="container">
					<Routes>
						<Route path="/" element={<Orders />}></Route>
						<Route path="/order" element={<Order />}></Route>
						<Route
							path="/login"
							element={<Login autentication={getLogin} />}
						></Route>
						<Route
							path="/preLogout"
							element={
								<ProtectedRoute
									path={"/logout"}
									isAutenticated={isAutenticated}
									protectedRouteVerify={getProtectedRouteVerify}
								/>
							}
						></Route>
						<Route
							path="/logout"
							element={
								<Logout
									autentication={getLogin}
									isAutenticated={isAutenticated}
									protectedRouteVerify={getProtectedRouteVerify}
								/>
							}
						></Route>
					</Routes>
				</div>
			</div>
			<div className="space"></div>
		</div>
	);
}

export default App;
