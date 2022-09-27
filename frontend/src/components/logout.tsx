import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import UserDataService from "../services/usersService";

const Logout = ({ autentication }: any, { protectedRouteVerify }: any) => {
	let [isAutenticated, setIsAutenticated] = useState(false);
	let [logoutResponse, setLogoutResponse] = useState(false);
	let navigate = useNavigate();
	function parseString(value: string) {
		return localStorage.getItem(value) === "true";
	}

	function logoutReq(): Promise<boolean> {
		UserDataService.logout()
			.then((res) => {
				console.log(res.data);
				setLogoutResponse(true);
				localStorage.setItem("email", "");
				localStorage.setItem("password", "");
				localStorage.setItem("isAutenticated", "false");
				localStorage.setItem("name", "");
				localStorage.setItem("lastName", "");

				navigate("/");
				return Promise.resolve(true);
			})
			.catch((e) => {
				console.log(e);
			});

		return Promise.resolve(false);
	}

	useEffect(() => {
		console.log(protectedRouteVerify);
		if (!protectedRouteVerify) {
			navigate("/");
		}

		if (logoutResponse) {
			let loginData = {
				email: " ",
				password: " ",
				isAutenticated: false,
				name: " ",
				lastName: " ",
			};
			autentication(loginData);
			console.log("logout");
		}
	}, [autentication, logoutResponse, navigate, protectedRouteVerify]);

	return (
		<div className="CenterDiv">
			<div>
				<h1>Sei sicuro di fare il logout?</h1>
				<Button
					onClick={() => {
						logoutReq();
					}}
				>
					Si
				</Button>
				<Link to="/">
					<Button variant="danger">No</Button>
				</Link>
			</div>
		</div>
	);
};

export default Logout;
