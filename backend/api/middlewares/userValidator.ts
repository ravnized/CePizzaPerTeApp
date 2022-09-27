import { check, validationResult } from "express-validator";

const validateUser = [
	check("name").notEmpty().withMessage("name can not be empty!").bail(),
	check("lastName")
		.notEmpty()
		.withMessage("last name can not be empty!")
		.bail(),
	check("email")
		.isEmail()
		.not()
		.isEmpty()
		.withMessage("Invalid email address!")
		.bail(),
	check("password").notEmpty().withMessage("password can not be empty!"),
	(req: any, res: any, next: any) => {
		let validationR: any;
		try {
			validationR = validationResult(req);
			validationR.throw();
		} catch (err) {
			res.status(400).json({ Error: validationR.array() });
		}
		if (validationR.isEmpty()) {
			next();
		}
	},
];
export default validateUser;
