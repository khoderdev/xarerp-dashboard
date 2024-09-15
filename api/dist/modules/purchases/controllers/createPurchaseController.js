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
exports.create = void 0;
const getUserService_1 = require("../../users/services/getUserService");
const getStoreService_1 = require("../../stores/services/getStoreService");
const getProviderService_1 = require("../../providers/services/getProviderService");
const getProductService_1 = require("../../products/services/getProductService");
const createPurchaseService_1 = require("../services/createPurchaseService");
const uuid_1 = require("uuid");
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { unity, provider, product, quantity, unit_price } = req.body;
        const user = req.userId;
        if (!unity || !provider || !product || !quantity || !unit_price) {
            return res.status(400).json({ error: 'Incomplete data' });
        }
        const hasUser = yield getUserService_1.getUserService.findOne(user);
        if (!hasUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        const hasStore = yield getStoreService_1.getStoreService.findOne(unity);
        if (!hasStore) {
            return res.status(404).json({ error: 'Store not found' });
        }
        const hasProvider = yield getProviderService_1.getProviderService.findOne(provider);
        if (!hasProvider) {
            return res.status(404).json({ error: 'Provider not found' });
        }
        const hasProduct = yield getProductService_1.getProductService.findOne(product);
        if (!hasProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }
        const purchase = yield createPurchaseService_1.createPurchaseService.create({
            id: (0, uuid_1.v4)(),
            user,
            unity,
            provider,
            product,
            quantity,
            unit_price,
            status: 0
        });
        if (!purchase) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.status(201).json({ purchase });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'InternalServerError' });
    }
});
exports.create = create;
