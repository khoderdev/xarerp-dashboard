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
const getPurchaseService_1 = require("../services/getPurchaseService");
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page, q } = req.query;
        const purchases = yield getPurchaseService_1.getPurchaseService.listAll(String(q), Number(page));
        if (!purchases) {
            return res.status(404).json({ error: 'Not found' });
        }
        let newArray = [];
        let returnedPurchases = [];
        returnedPurchases.push(purchases[0]);
        for (let i = 0; i < purchases[1].length; i++) {
            newArray.push({
                id: purchases[1][i].id,
                user_id: purchases[1][i].user_id,
                user: purchases[1][i].user.name,
                unity_id: purchases[1][i].unity_id,
                unity: purchases[1][i].unity.name,
                provider_id: purchases[1][i].provider_id,
                provider: purchases[1][i].provider.name,
                product_id: purchases[1][i].product_id,
                product_name: purchases[1][i].product.name,
                product_description: purchases[1][i].product.description,
                quantity: purchases[1][i].quantity,
                unit_price: purchases[1][i].unit_price,
                unit_price_formatted: `${purchases[1][i].unit_price.toLocaleString('pt-br', {
                    style: 'currency',
                    currency: 'BRL',
                })}`,
                status: purchases[1][i].status,
                created_at: purchases[1][i].created_at,
                updated_at: purchases[1][i].updated_at,
            });
        }
        returnedPurchases.push(newArray);
        return res.status(200).json({ purchases: returnedPurchases });
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
        const purchase = yield getPurchaseService_1.getPurchaseService.findOne(id);
        if (!purchase) {
            return res.status(404).json({ error: 'Not found' });
        }
        return res.status(200).json({ purchase });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'InternalServerError' });
    }
});
exports.getOne = getOne;
