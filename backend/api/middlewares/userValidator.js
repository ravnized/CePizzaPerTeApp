"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_validator_1 = require("express-validator");
var validateUser = [
    (0, express_validator_1.check)("name").notEmpty().withMessage("name can not be empty!").bail(),
    (0, express_validator_1.check)("lastName")
        .notEmpty()
        .withMessage("last name can not be empty!")
        .bail(),
    (0, express_validator_1.check)("email")
        .isEmail()
        .not()
        .isEmpty()
        .withMessage("Invalid email address!")
        .bail(),
    (0, express_validator_1.check)("password").notEmpty().withMessage("password can not be empty!"),
    function (req, res, next) {
        var validationR;
        try {
            validationR = (0, express_validator_1.validationResult)(req);
            validationR.throw();
        }
        catch (err) {
            res.status(400).json({ Error: validationR.array() });
        }
        if (validationR.isEmpty()) {
            next();
        }
    },
];
exports.default = validateUser;
