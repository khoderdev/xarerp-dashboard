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
exports.getSalesDashboardController = void 0;
const getSalesDashboardService_1 = require("../services/getSalesDashboardService");
const dateFormat_1 = require("../../../utils/dateFormat");
const getSalesDashboardController = ({ targetDate, days, currentDateTime, incrementerDay }) => __awaiter(void 0, void 0, void 0, function* () {
    const getSales = yield getSalesDashboardService_1.getSalesDashboardService.findSales(targetDate);
    let arrayDatesSales = [];
    for (let i = 0; i < days; i++) {
        arrayDatesSales.push({
            date: (0, dateFormat_1.formatDate)(new Date(currentDateTime + (incrementerDay * i))),
            quantitySales: 0
        });
    }
    getSales.map((item) => {
        let formattedDate = `${item.updated_at.getDate().toString().padStart(2, '0')}/${(item.updated_at.getMonth() + 1).toString().padStart(2, '0')}`;
        let findIndex = arrayDatesSales.findIndex((dateSale) => dateSale.date === formattedDate);
        if (findIndex > -1) {
            arrayDatesSales[findIndex].quantitySales += 1;
        }
    });
    let today = new Date();
    const todayFormattedDate = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
    const getLastSales = yield getSalesDashboardService_1.getSalesDashboardService.findLastSales(todayFormattedDate);
    const resultSales = {
        list: [],
        lastSales: [],
        invested: 0,
        received: 0,
        profit: 0
    };
    getLastSales.map((item) => {
        resultSales.lastSales.push({
            price: item.product.sale_price,
            name: item.product.name,
            unity: item.unity.name,
            quantity: 1
        });
    });
    getSales.map((item) => {
        resultSales.invested += item.product.purchase_price;
        resultSales.received += item.product.sale_price;
    });
    resultSales.profit = resultSales.received - resultSales.invested;
    resultSales.list = arrayDatesSales;
    return resultSales;
});
exports.getSalesDashboardController = getSalesDashboardController;
