import mongoose from "mongoose";
var uuidv1 = require("uuidv1");
import { createHmac, createSecretKey } from "crypto";
import * as jose from "jose";
import * as dotenv from "dotenv";
import UsersDAO from "../dao/userDAO";
import e from "express";
let _password: any;
let _salt: any;
let _encryPassword: any;
let _users: any;
declare var process: {
	env: {
		TOKEN_SECRET: string;
		JWT_ISSUER: string;
		JWT_AUDIENCE: string;
		JWT_EXPIRATION_TIME: string;
	};
};

export default class UsersController {
	static passwordEncrypter(password: String) {
		console.error(`password plain:${password}`);
		_password = password;
		_salt = uuidv1();
		console.error(`salt:${_salt}`);
		_encryPassword = this.securePasswordGenerator(password);
	}

	static securePasswordGenerator(plainPassword: any) {
		if (!plainPassword) return;
		try {
			return createHmac("sha256", _salt).update(plainPassword).digest("hex");
		} catch (e) {
			console.error(`Error: ${e}`);
		}
	}

	static async apiSignup(req: any, res: any) {
		let name = new String(),
			lastName = new String(),
			email = new String(),
			encryPassword = new String(),
			salt = new String(),
			insertUserResponse: any;

		let query: any = null;
		try {
			query = req.body;
		} catch (e) {
			console.error(`Can't retrive request.body ${e}`);
		}
		UsersController.passwordEncrypter(query.password);

		name = query.name;
		lastName = query.lastName;
		email = query.email;
		encryPassword = _encryPassword;
		salt = _salt;

		try {
			insertUserResponse = await UsersDAO.insertUser({
				name: name,
				lastName: lastName,
				email: email,
				encryPassword: encryPassword,
				salt: salt,
			});
		} catch (e) {
			console.error(`Problem in inserting user ${e}`);
		}
		return res.json(insertUserResponse);
	}
	static async apiLogin(req: any, res: any, next: any) {
		const userPerPage = req.body.userPerPage
			? parseInt(req.body.userPerPage, 10)
			: 20;
		const page = req.body.page ? parseInt(req.body.page, 10) : 0;

		let filters: any = {};
		filters.email = req.body.email;
		const { usersList, totalUserList } = await UsersDAO.getUser({
			filters,
			page,
			userPerPage,
		});

		let response = {
			users: usersList,
			page: page,
			filters: filters,
			entries_per_page: userPerPage,
			total_results: totalUserList,
		};
		const secretKey = createSecretKey(process.env.TOKEN_SECRET, "utf-8");
		for (let user of usersList) {
			if (user.email == req.body.email) {
				let encryPassword = createHmac("sha256", user.salt)
					.update(req.body.password)
					.digest("hex");
				console.error(encryPassword);
				if (user.encryPassword == encryPassword) {
					const tokenUser = new jose.SignJWT({ id: user._id })
						.setProtectedHeader({ alg: "HS256" })
						.setIssuedAt()
						.setIssuer(process.env.JWT_ISSUER) // issuer
						.setAudience(process.env.JWT_AUDIENCE) // audience
						.setExpirationTime(process.env.JWT_EXPIRATION_TIME) // token expiration time, e.g., "1 day"
						.sign(secretKey);
					res.cookie("token", tokenUser);
					return res.status(200).json({
						tokenUser,
						userSigned: {
							id: user._id,
							name: user.name,
							lastName: user.lastName,
							email: user.email,
						},
					});
				}
			}
		}

		return res.status(404).json(`Error: email or password not found`);
	}
	static async apiSignOut(req: any, res: any) {
		res.clearCookie("token");
		return res.json({
			message: "User siginout successful",
		});
	}
}
