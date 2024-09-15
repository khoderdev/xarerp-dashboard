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
exports.updateOne = void 0;
const getPurchaseService_1 = require("../services/getPurchaseService");
const getStoreService_1 = require("../../stores/services/getStoreService");
const getProviderService_1 = require("../../providers/services/getProviderService");
const getProductService_1 = require("../../products/services/getProductService");
const updatePurchaseService_1 = require("../services/updatePurchaseService");
const updateOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { unity, provider, product, quantity, unit_price, status } = req.body;
        if (!unity && !provider && !product && !quantity && !unit_price && status === '') {
            return res.status(400).json({ error: 'Incomplete data' });
        }
        const purchase = yield getPurchaseService_1.getPurchaseService.findOne(id);
        if (!purchase) {
            return res.status(404).json({ error: 'Not found' });
        }
        if (unity) {
            const hasStore = yield getStoreService_1.getStoreService.findOne(unity);
            if (!hasStore) {
                return res.status(404).json({ error: 'Store not found' });
            }
        }
        if (provider) {
            const hasProvider = yield getProviderService_1.getProviderService.findOne(provider);
            if (!hasProvider) {
                return res.status(404).json({ error: 'Provider not found' });
            }
        }
        if (product) {
            const hasProduct = yield getProductService_1.getProductService.findOne(product);
            if (!hasProduct) {
                return res.status(404).json({ error: 'Product not found' });
            }
        }
        const time = new Date().toISOString();
        const purchaseUpdated = yield updatePurchaseService_1.updatePurchaseService.update({
            id,
            data: {
                unity_id: unity,
                provider_id: provider,
                product_id: product,
                quantity,
                unit_price,
                status
            },
            time
        });
        if (!purchaseUpdated) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.status(200).json({ purchase: purchaseUpdated });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'InternalServerError' });
    }
});
exports.updateOne = updateOne;
