"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var uuidv1 = require("uuidv1");
var crypto_1 = require("crypto");
var jose = __importStar(require("jose"));
var userDAO_1 = __importDefault(require("../dao/userDAO"));
var _password;
var _salt;
var _encryPassword;
var _users;
var UsersController = /** @class */ (function () {
    function UsersController() {
    }
    UsersController.passwordEncrypter = function (password) {
        console.error("password plain:".concat(password));
        _password = password;
        _salt = uuidv1();
        console.error("salt:".concat(_salt));
        _encryPassword = this.securePasswordGenerator(password);
    };
    UsersController.securePasswordGenerator = function (plainPassword) {
        if (!plainPassword)
            return;
        try {
            return (0, crypto_1.createHmac)("sha256", _salt).update(plainPassword).digest("hex");
        }
        catch (e) {
            console.error("Error: ".concat(e));
        }
    };
    UsersController.apiSignup = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var name, lastName, email, encryPassword, salt, insertUserResponse, query, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        name = new String(), lastName = new String(), email = new String(), encryPassword = new String(), salt = new String();
                        query = null;
                        try {
                            query = req.body;
                        }
                        catch (e) {
                            console.error("Can't retrive request.body ".concat(e));
                        }
                        UsersController.passwordEncrypter(query.password);
                        name = query.name;
                        lastName = query.lastName;
                        email = query.email;
                        encryPassword = _encryPassword;
                        salt = _salt;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, userDAO_1.default.insertUser({
                                name: name,
                                lastName: lastName,
                                email: email,
                                encryPassword: encryPassword,
                                salt: salt,
                            })];
                    case 2:
                        insertUserResponse = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        console.error("Problem in inserting user ".concat(e_1));
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, res.json(insertUserResponse)];
                }
            });
        });
    };
    UsersController.apiLogin = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var userPerPage, page, filters, _a, usersList, totalUserList, response, secretKey, _i, usersList_1, user, encryPassword, tokenUser;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        userPerPage = req.body.userPerPage
                            ? parseInt(req.body.userPerPage, 10)
                            : 20;
                        page = req.body.page ? parseInt(req.body.page, 10) : 0;
                        filters = {};
                        filters.email = req.body.email;
                        return [4 /*yield*/, userDAO_1.default.getUser({
                                filters: filters,
                                page: page,
                                userPerPage: userPerPage,
                            })];
                    case 1:
                        _a = _b.sent(), usersList = _a.usersList, totalUserList = _a.totalUserList;
                        response = {
                            users: usersList,
                            page: page,
                            filters: filters,
                            entries_per_page: userPerPage,
                            total_results: totalUserList,
                        };
                        secretKey = (0, crypto_1.createSecretKey)(process.env.TOKEN_SECRET, "utf-8");
                        for (_i = 0, usersList_1 = usersList; _i < usersList_1.length; _i++) {
                            user = usersList_1[_i];
                            if (user.email == req.body.email) {
                                encryPassword = (0, crypto_1.createHmac)("sha256", user.salt)
                                    .update(req.body.password)
                                    .digest("hex");
                                console.error(encryPassword);
                                if (user.encryPassword == encryPassword) {
                                    tokenUser = new jose.SignJWT({ id: user._id })
                                        .setProtectedHeader({ alg: "HS256" })
                                        .setIssuedAt()
                                        .setIssuer(process.env.JWT_ISSUER) // issuer
                                        .setAudience(process.env.JWT_AUDIENCE) // audience
                                        .setExpirationTime(process.env.JWT_EXPIRATION_TIME) // token expiration time, e.g., "1 day"
                                        .sign(secretKey);
                                    res.cookie("token", tokenUser);
                                    return [2 /*return*/, res.status(200).json({
                                            tokenUser: tokenUser,
                                            userSigned: {
                                                id: user._id,
                                                name: user.name,
                                                lastName: user.lastName,
                                                email: user.email,
                                            },
                                        })];
                                }
                            }
                        }
                        return [2 /*return*/, res.status(404).json("Error: email or password not found")];
                }
            });
        });
    };
    UsersController.apiSignOut = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                res.clearCookie("token");
                return [2 /*return*/, res.json({
                        message: "User siginout successful",
                    })];
            });
        });
    };
    return UsersController;
}());
exports.default = UsersController;
