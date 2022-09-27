import mongoose, { mongo } from "mongoose";
import jose from "jose";
interface filtersArray {
	[key: string]: string | number;
}

let users: any;
export default class UsersDAO {
	static async injectDB(conn: any) {
		if (users) return;
		try {
			users = await conn.db("Main").collection("Users");
			console.log(`Users collection initialized`);
		} catch (e) {
			console.error(`unable to enstablish a collection handle ${e}`);
		}
	}
	static async insertUser({
		name = new String(),
		lastName = new String(),
		email = new String(),
		encryPassword = new String(),
		salt = new String(),
	} = {}): Promise<any> {
		let user: any;
		let cursor: any;

		user = {
			name,
			lastName,
			email,
			encryPassword,
			salt,
		};

		try {
			console.log(user);
			cursor = users.insertOne(user);
			return cursor;
		} catch (e) {
			console.log(`Unable to insert user, ${e}`);
			return (user = {});
		}
	}

	static async getUser({
		filters = {} as filtersArray,
		page = 0,
		userPerPage = 10,
	} = {}): Promise<any> {
		try {
			let query: any = {};
			if ("name" in filters) {
				query = { name: { $eq: filters["name"] } };
			} else if ("lastName" in filters) {
				query = { lastName: { $eq: filters["lastName"] } };
			} else if ("email" in filters) {
				query = { email: { $eq: filters["email"] } };
			}

			let cursor: any;
			try {
				cursor = await users.find(query);
			} catch (e) {
				console.error(`Unable to issue find command, ${e}`);
				return { userList: 0, totalUserList: 0 };
			}

			const displayCursor = cursor.limit(userPerPage).skip(userPerPage * page);
			try {
				const usersList = await displayCursor.toArray();
				const totalUsersList = await users.countDocuments(query);
				return { usersList, totalUsersList };
			} catch (e) {
				console.log(
					`Unable to convert cursor to array or problem counting documents, ${e}`,
				);
				return { usersList: [], totalUsersList: 0 };
			}
		} catch (e) {
			console.log(`unable to get users ${e}`);
		}
	}
}
