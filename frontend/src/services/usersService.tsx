import httpUsers from "../http-users";

class UserDataService {
	static login(email: string, password: string) {
		return httpUsers.post("/signIn", {
			email: email,
			password: password,
		});
	}
	static logout() {
		return httpUsers.get("/signOut");
	}
}
export default UserDataService;
