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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductsDashboardController = void 0;
const getProductsDashboardService_1 = require("../services/getProductsDashboardService");
const getProductsDashboardController = () => __awaiter(void 0, void 0, void 0, function* () {
    const getProducts = yield getProductsDashboardService_1.getProductsDashboardService.findProducts(5);
    const resultProducts = {
        list: {},
        averageTotalTicket: 0
    };
    let valueSales = 0;
    let quantitySales = 0;
    let averageTotalTicket = 0;
    getProducts.map((item) => {
        quantitySales += item.sold_amount;
        valueSales += item.sale_price * item.sold_amount;
    });
    averageTotalTicket = valueSales / quantitySales;
    resultProducts.list = getProducts.map((item) => {
        return {
            name: item.name,
            sold_amount: item.sold_amount
        };
    });
    resultProducts.averageTotalTicket = Math.floor(averageTotalTicket);
    return resultProducts;
});
exports.getProductsDashboardController = getProductsDashboardController;
