import React, { useEffect, useState } from "react";
import UserDataService from "../services/usersService";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

const Login = ({ autentication }: any) => {
	let [email, setEmail] = useState("");
	let [password, setPassword] = useState("");
	let [isAutenticated, setIsAutenticated] = useState(false);
	let [name, setName] = useState("");
	let [lastName, setLastName] = useState("");
	let navigate = useNavigate();
	function loginReq(): Promise<boolean> {
		UserDataService.login(email, password)
			.then((res) => {
				console.log(res.data.userSigned);
				setName(res.data.userSigned.name);
				setLastName(res.data.userSigned.lastName);
				setIsAutenticated(true);
				navigate("/");
				return Promise.resolve(true);
			})
			.catch((e) => {
				setIsAutenticated(false);
				return Promise.resolve(false);
			});
		return Promise.resolve(false);
	}
	function handleSubmit(e: any) {
		e.preventDefault();
	}

	function passLogin() {
		let loginData = {
			email: email,
			password: password,
			isAutenticated: isAutenticated,
			name: name,
			lastName: lastName,
		};
		autentication(loginData);
	}

	useEffect(() => {
		if (isAutenticated) {
			passLogin();
			console.log("email: " + email);
			console.log("password: " + password);
			console.log("isAutenticated: " + isAutenticated);
			console.log("name: " + name);
			console.log("lastName: " + lastName);
		}
	});
	return (
		<Form>
			<Form.Group className="mb-3" controlId="formBasicEmail">
				<Form.Label>Email address</Form.Label>
				<Form.Control
					type="email"
					placeholder="Enter email"
					onChange={(e) => {
						setEmail(e.target["value"]);
					}}
				/>
				<Form.Text className="text-muted">
					We'll never share your email with anyone else.
				</Form.Text>
			</Form.Group>

			<Form.Group className="mb-3" controlId="formBasicPassword">
				<Form.Label>Password</Form.Label>
				<Form.Control
					type="password"
					placeholder="Password"
					onChange={(e) => {
						setPassword(e.target["value"]);
					}}
				/>
			</Form.Group>

			<Button
				variant="primary"
				type="submit"
				onClick={(e) => {
					handleSubmit(e);
					loginReq();
				}}
			>
				Submit
			</Button>
		</Form>
	);
};

export default Login;
