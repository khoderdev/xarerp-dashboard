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
const getProductService_1 = require("../services/getProductService");
const updateProductService_1 = require("../services/updateProductService");
const getCategoryService_1 = require("../../categories/services/getCategoryService");
const getStoreService_1 = require("../../stores/services/getStoreService");
const getProviderService_1 = require("../../providers/services/getProviderService");
const updateOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, description, purchase_price, sale_price, category, unity, provider, lot, validity, quantity } = req.body;
        if (!name && !description && !purchase_price && !sale_price && !category && !unity && !provider && !lot && !validity && !quantity) {
            return res.status(400).json({ error: 'Incomplete data' });
        }
        const product = yield getProductService_1.getProductService.findOne(id);
        if (!product) {
            return res.status(404).json({ error: 'Not found' });
        }
        if (category) {
            const hasCategory = yield getCategoryService_1.getCategoryService.findOne(category);
            if (!hasCategory) {
                return res.status(404).json({ error: 'Category not found' });
            }
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
        const time = new Date().toISOString();
        const validityToDate = new Date(validity);
        const productUpdated = yield updateProductService_1.updateProductService.update({
            id,
            data: {
                name,
                description,
                purchase_price,
                sale_price,
                category_id: category,
                unity_id: unity,
                provider_id: provider,
                lot,
                validity: validityToDate,
                quantity
            },
            time
        });
        if (!productUpdated) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.status(200).json({ product: productUpdated });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'InternalServerError' });
    }
});
exports.updateOne = updateOne;
