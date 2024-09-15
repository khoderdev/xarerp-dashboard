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
exports.getStoresDashboardController = void 0;
const getStoresDashboardService_1 = require("../services/getStoresDashboardService");
const getStoresDashboardController = ({ targetDate }) => __awaiter(void 0, void 0, void 0, function* () {
    const getStores = yield getStoresDashboardService_1.getStoresDashboardService.findSalesDefaultStore(targetDate);
    let formattedRankingByType = [];
    let orderRankingByType = [];
    const resultStores = {
        profitByType: [],
        rankingByType: []
    };
    getStores.map((item) => {
        let findIndex = formattedRankingByType.findIndex((store) => store.name === item.unity.name);
        if (findIndex > -1) {
            formattedRankingByType[findIndex].profit += item.product.sale_price - item.product.purchase_price;
        }
        else {
            formattedRankingByType.push({
                type: item.unity.type,
                name: item.unity.name,
                profit: item.product.sale_price - item.product.purchase_price
            });
        }
    });
    formattedRankingByType.map((item) => {
        let findIndex = orderRankingByType.findIndex((store) => store.type === item.type);
        if (findIndex > -1) {
            if (item.profit > orderRankingByType[findIndex].profit) {
                orderRankingByType[findIndex].name = item.name;
                orderRankingByType[findIndex].profit = item.profit;
            }
        }
        else {
            orderRankingByType.push({
                name: item.name,
                type: item.type,
                profit: item.profit
            });
        }
    });
    resultStores.rankingByType = orderRankingByType.sort((a, b) => {
        if (a.profit === b.profit) {
            return 0;
        }
        return a.profit > b.profit ? -1 : 1;
    });
    getStores.map((item) => {
        let findIndex = resultStores.profitByType.findIndex((store) => store.type === item.unity.type);
        if (findIndex > -1) {
            resultStores.profitByType[findIndex].profit += item.product.sale_price - item.product.purchase_price;
        }
        else {
            resultStores.profitByType.push({
                type: item.unity.type,
                profit: item.product.sale_price - item.product.purchase_price
            });
        }
    });
    return resultStores;
});
exports.getStoresDashboardController = getStoresDashboardController;
