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
const getProductService_1 = require("../../products/services/getProductService");
const getStoreService_1 = require("../../stores/services/getStoreService");
const getClientService_1 = require("../../clients/services/getClientService");
const getSellerService_1 = require("../../sellers/services/getSellerService");
const getCarrierService_1 = require("../../carriers/services/getCarrierService");
const updateProductService_1 = require("../../products/services/updateProductService");
const createSaleService_1 = require("../services/createSaleService");
const uuid_1 = require("uuid");
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { product, unity, client, seller, carrier, quantity } = req.body;
        if (!product || !unity || !client || !seller || !carrier || !quantity) {
            return res.status(400).json({ error: 'Incomplete data' });
        }
        const hasProduct = yield getProductService_1.getProductService.findOne(product);
        if (!hasProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }
        const hasStore = yield getStoreService_1.getStoreService.findOne(unity);
        if (!hasStore) {
            return res.status(404).json({ error: 'Store not found' });
        }
        const hasClient = yield getClientService_1.getClientService.findOne(client);
        if (!hasClient) {
            return res.status(404).json({ error: 'Client not found' });
        }
        const hasSeller = yield getSellerService_1.getSellerService.findOne(seller);
        if (!hasSeller) {
            return res.status(404).json({ error: 'Seller not found' });
        }
        const hasCarrier = yield getCarrierService_1.getCarrierService.findOne(carrier);
        if (!hasCarrier) {
            return res.status(404).json({ error: 'Carrier not found' });
        }
        const sale = yield createSaleService_1.createSaleService.create({
            id: (0, uuid_1.v4)(),
            product,
            unity,
            client,
            seller,
            carrier,
            quantity,
            status: 0
        });
        if (!sale) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        const time = new Date().toISOString();
        yield updateProductService_1.updateProductService.update({
            id: hasProduct.id,
            data: {
                sold_amount: hasProduct.sold_amount + quantity
            },
            time
        });
        return res.status(201).json({ sale });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'InternalServerError' });
    }
});
exports.create = create;
