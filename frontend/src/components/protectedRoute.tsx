import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logout from "./logout";

const ProtectedRoute = (
	path: any,
	isAutenticated: boolean,
	{ protectedRouteVerify }: any,
) => {
	let navigate = useNavigate();
	
	useEffect(() => {
		console.log(protectedRouteVerify);

		if (isAutenticated) {
			
			protectedRouteVerify();
			navigate(path);
		} else {
			navigate("/");
		}
	}, [isAutenticated, navigate, path, protectedRouteVerify]);

	return (
		<div>
			<h1>Protected Route</h1>
		</div>
	);
};
export default ProtectedRoute;
