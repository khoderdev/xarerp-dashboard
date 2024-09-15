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
const createProductService_1 = require("../services/createProductService");
const getCategoryService_1 = require("../../categories/services/getCategoryService");
const getStoreService_1 = require("../../stores/services/getStoreService");
const getProviderService_1 = require("../../providers/services/getProviderService");
const getUserService_1 = require("../../users/services/getUserService");
const uuid_1 = require("uuid");
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, purchase_price, sale_price, category, unity, provider, lot, validity, quantity } = req.body;
        const user = req.userId;
        if (!name || !description || !purchase_price || !sale_price || !category || !unity || !provider || !lot || !validity || !quantity) {
            return res.status(400).json({ error: 'Incomplete data' });
        }
        const hasCategory = yield getCategoryService_1.getCategoryService.findOne(category);
        if (!hasCategory) {
            return res.status(404).json({ error: 'Category not found' });
        }
        const hasStore = yield getStoreService_1.getStoreService.findOne(unity);
        if (!hasStore) {
            return res.status(404).json({ error: 'Store not found' });
        }
        const hasProvider = yield getProviderService_1.getProviderService.findOne(provider);
        if (!hasProvider) {
            return res.status(404).json({ error: 'Provider not found' });
        }
        const hasUser = yield getUserService_1.getUserService.findOne(user);
        if (!hasUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        const validityToDate = new Date(validity);
        const product = yield createProductService_1.createProductService.create({
            id: (0, uuid_1.v4)(),
            name,
            description,
            purchase_price,
            sale_price,
            category,
            unity,
            provider,
            user,
            lot,
            validity: validityToDate,
            quantity
        });
        if (!product) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.status(201).json({ product });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'InternalServerError' });
    }
});
exports.create = create;
