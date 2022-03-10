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
var ordersDAO_1 = __importDefault(require("../dao/ordersDAO"));
var OrderSchema = new mongoose_1.default.Schema({
    _id: mongoose_1.default.Schema.Types.ObjectId,
    client_id: mongoose_1.default.Schema.Types.ObjectId,
    date: mongoose_1.default.Schema.Types.Date,
    cost: mongoose_1.default.Schema.Types.Number,
    JustEat: mongoose_1.default.Schema.Types.Boolean,
    JustEat_order: mongoose_1.default.Schema.Types.String,
    Deliveroo: mongoose_1.default.Schema.Types.Boolean,
    Deliveroo_order: mongoose_1.default.Schema.Types.String,
    Pizze_Ordinate: [
        {
            id: mongoose_1.default.Schema.Types.ObjectId,
            aggiunte: [mongoose_1.default.Schema.Types.ObjectId],
            note: mongoose_1.default.Schema.Types.String,
        },
    ],
});
var OrdersController = /** @class */ (function () {
    function OrdersController() {
    }
    OrdersController.apiGetOrder = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var ordersPerPage, page, filters, _a, ordersList, totalOrderList, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        ordersPerPage = req.query.ordersPerPage
                            ? parseInt(req.query.ordersPerPage, 10)
                            : 20;
                        page = req.query.page ? parseInt(req.query.page, 10) : 0;
                        filters = {};
                        if (req.query.date) {
                            filters.date = req.query.date;
                        }
                        else if (req.query.cost) {
                            filters.cost = req.query.cost;
                        }
                        else if (req.query.JustEat) {
                            filters.JustEat = req.query.JustEat;
                        }
                        else if (req.query.Deliveroo) {
                            filters.Deliveroo = req.query.Deliveroo;
                        }
                        return [4 /*yield*/, ordersDAO_1.default.getOrders({
                                filters: filters,
                                page: page,
                                ordersPerPage: ordersPerPage,
                            })];
                    case 1:
                        _a = _b.sent(), ordersList = _a.ordersList, totalOrderList = _a.totalOrderList;
                        response = {
                            orders: ordersList,
                            page: page,
                            filters: filters,
                            entries_per_page: ordersPerPage,
                            total_results: totalOrderList,
                        };
                        res.json(response);
                        return [2 /*return*/];
                }
            });
        });
    };
    OrdersController.apiInsertOrder = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var clientId, date, cost, JustEat, JustEat_order, Deliveroo, Deliveroo_order, pizze_ordinate, insertOrderResponse, query, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        date = new Date(), cost = 0, JustEat = false, JustEat_order = "", Deliveroo = false, Deliveroo_order = "";
                        query = null;
                        try {
                            query = req.body;
                        }
                        catch (e) {
                            console.error("Can't retrive request.body ".concat(e));
                        }
                        clientId = query.clientId;
                        date = query.date;
                        cost = query.cost;
                        JustEat = query.JustEat;
                        JustEat_order = query.JustEat_order;
                        Deliveroo = query.Deliveroo;
                        Deliveroo_order = query.Deliveroo_order;
                        pizze_ordinate = query.pizze_ordinate;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, ordersDAO_1.default.insertOrder({
                                clientId: clientId,
                                date: date,
                                cost: cost,
                                JustEat: JustEat,
                                JustEat_order: JustEat_order,
                                Deliveroo: Deliveroo,
                                Deliveroo_order: Deliveroo_order,
                                pizze_ordinate: pizze_ordinate,
                            })];
                    case 2:
                        insertOrderResponse = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        console.error("Problem in inserting order ".concat(e_1));
                        return [3 /*break*/, 4];
                    case 4:
                        res.json(insertOrderResponse);
                        return [2 /*return*/];
                }
            });
        });
    };
    return OrdersController;
}());
exports.default = OrdersController;
