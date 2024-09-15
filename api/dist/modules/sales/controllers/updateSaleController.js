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
const getSaleService_1 = require("../services/getSaleService");
const getProductService_1 = require("../../products/services/getProductService");
const getStoreService_1 = require("../../stores/services/getStoreService");
const getClientService_1 = require("../../clients/services/getClientService");
const getSellerService_1 = require("../../sellers/services/getSellerService");
const getCarrierService_1 = require("../../carriers/services/getCarrierService");
const updateSaleService_1 = require("../services/updateSaleService");
const updateOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { product, unity, client, seller, carrier, quantity, status } = req.body;
        if (!product && !unity && !client && !seller && !carrier && !quantity && status === '') {
            return res.status(400).json({ error: 'Incomplete data' });
        }
        const sale = yield getSaleService_1.getSaleService.findOne(id);
        if (!sale) {
            return res.status(404).json({ error: 'Not found' });
        }
        if (product) {
            const hasProduct = yield getProductService_1.getProductService.findOne(product);
            if (!hasProduct) {
                return res.status(404).json({ error: 'Product not found' });
            }
        }
        if (unity) {
            const hasStore = yield getStoreService_1.getStoreService.findOne(unity);
            if (!hasStore) {
                return res.status(404).json({ error: 'Store not found' });
            }
        }
        if (client) {
            const hasClient = yield getClientService_1.getClientService.findOne(client);
            if (!hasClient) {
                return res.status(404).json({ error: 'Client not found' });
            }
        }
        if (seller) {
            const hasSeller = yield getSellerService_1.getSellerService.findOne(seller);
            if (!hasSeller) {
                return res.status(404).json({ error: 'Seller not found' });
            }
        }
        if (carrier) {
            const hasCarrier = yield getCarrierService_1.getCarrierService.findOne(carrier);
            if (!hasCarrier) {
                return res.status(404).json({ error: 'Carrier not found' });
            }
        }
        const time = new Date().toISOString();
        const saleUpdated = yield updateSaleService_1.updateSaleService.update({
            id,
            data: {
                product_id: product,
                unity_id: unity,
                client_id: client,
                seller_id: seller,
                carrier_id: carrier,
                quantity,
                status
            },
            time
        });
        if (!saleUpdated) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.status(200).json({ sale: saleUpdated });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'InternalServerError' });
    }
});
exports.updateOne = updateOne;
