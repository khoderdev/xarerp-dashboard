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
exports.getOne = exports.getAll = void 0;
const getSaleService_1 = require("../services/getSaleService");
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page, q } = req.query;
        const sales = yield getSaleService_1.getSaleService.listAll(String(q), Number(page));
        if (!sales) {
            return res.status(404).json({ error: 'Not found' });
        }
        let newArray = [];
        let returnedSales = [];
        returnedSales.push(sales[0]);
        for (let i = 0; i < sales[1].length; i++) {
            newArray.push({
                id: sales[1][i].id,
                product_id: sales[1][i].product_id,
                product_name: sales[1][i].product.name,
                product_description: sales[1][i].product.description,
                unity_id: sales[1][i].unity_id,
                unity: sales[1][i].unity.name,
                client_id: sales[1][i].client_id,
                client_name: sales[1][i].client.name,
                client_city: sales[1][i].client.city,
                client_state: sales[1][i].client.state,
                seller_id: sales[1][i].seller_id,
                seller: sales[1][i].seller.user.name,
                carrier_id: sales[1][i].carrier_id,
                carrier: sales[1][i].carrier.name,
                quantity: sales[1][i].quantity,
                status: sales[1][i].status,
                created_at: sales[1][i].created_at,
                updated_at: sales[1][i].updated_at,
            });
        }
        returnedSales.push(newArray);
        return res.status(200).json({ sales: returnedSales });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'InternalServerError' });
    }
});
exports.getAll = getAll;
const getOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const sale = yield getSaleService_1.getSaleService.findOne(id);
        if (!sale) {
            return res.status(404).json({ error: 'Not found' });
        }
        return res.status(200).json({ sale });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'InternalServerError' });
    }
});
exports.getOne = getOne;
