import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import UserDataService from "../services/usersService";

const Logout = ({ autentication, protectedResponse }: any) => {
	let [logoutResponse, setLogoutResponse] = useState(false);
	let navigate = useNavigate();

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
		if (!protectedResponse) {
			navigate("/");
		} else {
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
		}
	}, [autentication, logoutResponse, navigate, protectedResponse]);

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
