import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ protectedResponse, option, path }: any) => {
	let navigate = useNavigate();
	useEffect(() => {
		if (option) {
			protectedResponse(true);
			navigate(path);
		} else {
			console.log("bad login");
			navigate("/");
		}
	}, [navigate, option, path, protectedResponse]);

	return (
		<div>
			<h1>Protected Route </h1>
		</div>
	);
};
export default ProtectedRoute;
