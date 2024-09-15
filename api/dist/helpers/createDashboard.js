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
exports.createDashboard = void 0;
const getSalesDashboardController_1 = require("../modules/dashboard/controllers/getSalesDashboardController");
const getProductsDashboardController_1 = require("../modules/dashboard/controllers/getProductsDashboardController");
const getFinancialDashboardController_1 = require("../modules/dashboard/controllers/getFinancialDashboardController");
const getStoresDashboardController_1 = require("../modules/dashboard/controllers/getStoresDashboardController");
const createDashboard = (type, targetDate, days) => __awaiter(void 0, void 0, void 0, function* () {
    const getSalesRoles = ['Administration', 'Financial', 'Sales'];
    const getProductsRoles = ['Administration', 'Sales', 'Deposit'];
    const getFinancialRoles = ['Administration', 'Financial'];
    const getStoresRoles = ['Administration'];
    const currentDate = new Date(targetDate);
    const currentDateTime = currentDate.getTime();
    const incrementerDay = 86400000;
    const dashboardProps = {
        targetDate,
        days,
        currentDate,
        currentDateTime,
        incrementerDay
    };
    const result = {
        sales: {},
        products: {},
        financial: {},
        stores: {}
    };
    const getSales = getSalesRoles.includes(type)
        ?
            yield (0, getSalesDashboardController_1.getSalesDashboardController)(dashboardProps)
        :
            '';
    const getProducts = getProductsRoles.includes(type)
        ?
            yield (0, getProductsDashboardController_1.getProductsDashboardController)()
        :
            '';
    const getFinancial = getFinancialRoles.includes(type)
        ?
            yield (0, getFinancialDashboardController_1.getFinancialDashboardController)(dashboardProps)
        :
            '';
    const getStores = getStoresRoles.includes(type)
        ?
            yield (0, getStoresDashboardController_1.getStoresDashboardController)(dashboardProps)
        :
            '';
    result.sales = getSales;
    result.products = getProducts;
    result.financial = getFinancial;
    result.stores = getStores;
    return result;
});
exports.createDashboard = createDashboard;
