"use strict";
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
var mongoose_1 = __importDefault(require("mongoose"));
var orders;
var OrdersDAO = /** @class */ (function () {
    function OrdersDAO() {
    }
    OrdersDAO.injectDB = function (conn) {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (orders)
                            return [2 /*return*/];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, conn.db("Main").collection("Ordini")];
                    case 2:
                        orders = _a.sent();
                        console.log("Ordini collection initialized");
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        console.error("unable to enstablish a collection handle ".concat(e_1));
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrdersDAO.getOrders = function (_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.filters, filters = _c === void 0 ? {} : _c, _d = _b.page, page = _d === void 0 ? 0 : _d, _e = _b.ordersPerPage, ordersPerPage = _e === void 0 ? 10 : _e;
        return __awaiter(this, void 0, void 0, function () {
            var query, cursor, e_2, displayCursor, ordersList, totalOrderList, e_3, e_4;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _f.trys.push([0, 10, , 11]);
                        query = {};
                        if ("date" in filters) {
                            query = { date: { $eq: filters["date"] } };
                        }
                        else if ("cost" in filters) {
                            query = { adress: { $eq: filters["cost"] } };
                        }
                        else if ("JustEat" in filters) {
                            query = { JustEat: { $eq: filters["JustEat"] } };
                        }
                        else if ("Deliveroo" in filters) {
                            query = { Deliveroo: { $eq: filters["Deliveroo"] } };
                        }
                        cursor = void 0;
                        _f.label = 1;
                    case 1:
                        _f.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, orders.find(query)];
                    case 2:
                        cursor = _f.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _f.sent();
                        console.error("Unable to issue find command, ".concat(e_2));
                        return [2 /*return*/, { ordersList: 0, totalOrderList: 0 }];
                    case 4:
                        displayCursor = cursor
                            .limit(ordersPerPage)
                            .skip(ordersPerPage * page);
                        _f.label = 5;
                    case 5:
                        _f.trys.push([5, 8, , 9]);
                        return [4 /*yield*/, displayCursor.toArray()];
                    case 6:
                        ordersList = _f.sent();
                        return [4 /*yield*/, orders.countDocuments(query)];
                    case 7:
                        totalOrderList = _f.sent();
                        return [2 /*return*/, { ordersList: ordersList, totalOrderList: totalOrderList }];
                    case 8:
                        e_3 = _f.sent();
                        console.log("Unable to convert cursor to array or problem counting documents, ".concat(e_3));
                        return [2 /*return*/, { ordersList: [], totalOrderList: 0 }];
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        e_4 = _f.sent();
                        console.log("unable to get clients ".concat(e_4));
                        return [3 /*break*/, 11];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    OrdersDAO.insertOrder = function (_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.clientId, clientId = _c === void 0 ? new mongoose_1.default.Types.ObjectId() : _c, _d = _b.date, date = _d === void 0 ? new Date() : _d, _e = _b.cost, cost = _e === void 0 ? 0 : _e, _f = _b.JustEat, JustEat = _f === void 0 ? false : _f, _g = _b.JustEat_order, JustEat_order = _g === void 0 ? "" : _g, _h = _b.Deliveroo, Deliveroo = _h === void 0 ? false : _h, _j = _b.Deliveroo_order, Deliveroo_order = _j === void 0 ? "" : _j, _k = _b.pizze_ordinate, pizze_ordinate = _k === void 0 ? [] : _k;
        return __awaiter(this, void 0, void 0, function () {
            var order, cursor;
            return __generator(this, function (_l) {
                order = {
                    clientId: clientId,
                    date: date,
                    cost: cost,
                    JustEat: JustEat,
                    JustEat_order: JustEat_order,
                    Deliveroo: Deliveroo,
                    Deliveroo_order: Deliveroo_order,
                    pizze_ordinate: pizze_ordinate,
                };
                try {
                    console.log(order);
                    cursor = orders.insertOne(order);
                    return [2 /*return*/, cursor];
                }
                catch (e) {
                    console.log("Unable to insert order, ".concat(e));
                    return [2 /*return*/, (order = {})];
                }
                return [2 /*return*/];
            });
        });
    };
    return OrdersDAO;
}());
exports.default = OrdersDAO;
