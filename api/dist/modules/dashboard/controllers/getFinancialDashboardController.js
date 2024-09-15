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
exports.getFinancialDashboardController = void 0;
const getFinancialDashboardService_1 = require("../services/getFinancialDashboardService");
const dateFormat_1 = require("../../../utils/dateFormat");
const getFinancialDashboardController = ({ targetDate, days, currentDateTime, incrementerDay }) => __awaiter(void 0, void 0, void 0, function* () {
    const getFinancial = yield getFinancialDashboardService_1.getFinancialDashboardService.findFinancial(targetDate);
    let arrayDatesFinancial = [];
    for (let i = 0; i < days; i++) {
        arrayDatesFinancial.push({
            date: (0, dateFormat_1.formatDate)(new Date(currentDateTime + (incrementerDay * i))),
            negative: 0,
            positive: 0
        });
    }
    getFinancial.map((item) => {
        let formattedDate = `${item.updated_at.getDate().toString().padStart(2, '0')}/${(item.updated_at.getMonth() + 1).toString().padStart(2, '0')}`;
        let findIndex = arrayDatesFinancial.findIndex((dateSale) => dateSale.date === formattedDate);
        if (findIndex > -1) {
            if (item.type === 0) {
                arrayDatesFinancial[findIndex].negative += -Math.abs(item.value);
            }
            else {
                arrayDatesFinancial[findIndex].positive += item.value;
            }
        }
    });
    const resultFinancial = {
        list: [],
        totalEntries: 0,
        totalOutputs: 0,
        difference: 0
    };
    getFinancial.map((item) => {
        if (item.type === 0) {
            resultFinancial.totalOutputs += item.value;
        }
        else {
            resultFinancial.totalEntries += item.value;
        }
    });
    resultFinancial.difference = resultFinancial.totalEntries - resultFinancial.totalOutputs;
    resultFinancial.list = arrayDatesFinancial;
    return resultFinancial;
});
exports.getFinancialDashboardController = getFinancialDashboardController;
