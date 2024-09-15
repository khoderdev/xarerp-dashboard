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
exports.getOne = exports.getRegisters = exports.getAll = void 0;
const getProductService_1 = require("../services/getProductService");
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page, q } = req.query;
        const products = yield getProductService_1.getProductService.listAll(String(q), Number(page));
        if (!products) {
            return res.status(404).json({ error: 'Not found' });
        }
        let newArray = [];
        let returnedProducts = [];
        returnedProducts.push(products[0]);
        const formatValidity = (validity) => {
            return `${validity.getUTCFullYear()}-${(validity.getUTCMonth() + 1).toString().padStart(2, '0')}-${validity.getUTCDate().toString().padStart(2, '0')}`;
        };
        for (let i = 0; i < products[1].length; i++) {
            newArray.push({
                id: products[1][i].id,
                name: products[1][i].name,
                description: products[1][i].description,
                purchase_price: products[1][i].purchase_price,
                purchase_price_formatted: `${products[1][i].purchase_price.toLocaleString('pt-br', {
                    style: 'currency',
                    currency: 'BRL',
                })}`,
                sale_price: products[1][i].sale_price,
                sale_price_formatted: `${products[1][i].sale_price.toLocaleString('pt-br', {
                    style: 'currency',
                    currency: 'BRL',
                })}`,
                category_id: products[1][i].category_id,
                category: products[1][i].category.title,
                unity_id: products[1][i].unity_id,
                unity: products[1][i].unity.name,
                provider_id: products[1][i].provider_id,
                provider: products[1][i].provider.name,
                user_id: products[1][i].user_id,
                user: products[1][i].user.name,
                lot: products[1][i].lot,
                validity: formatValidity(products[1][i].validity),
                quantity: products[1][i].quantity,
                created_at: products[1][i].created_at,
                updated_at: products[1][i].updated_at,
            });
        }
        returnedProducts.push(newArray);
        return res.status(200).json({ products: returnedProducts });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'InternalServerError' });
    }
});
exports.getAll = getAll;
const getRegisters = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page, q } = req.query;
        const products = yield getProductService_1.getProductService.listAll(String(q), Number(page));
        if (!products) {
            return res.status(404).json({ error: 'Not found' });
        }
        let newArray = [];
        let returnedProducts = [];
        returnedProducts.push(products[0]);
        for (let i = 0; i < products[1].length; i++) {
            newArray.push({
                id: products[1][i].id,
                name: products[1][i].name,
                description: products[1][i].description,
                purchase_price: products[1][i].purchase_price,
                purchase_price_formatted: `${products[1][i].purchase_price.toLocaleString('pt-br', {
                    style: 'currency',
                    currency: 'BRL',
                })}`,
                sale_price: products[1][i].sale_price,
                sale_price_formatted: `${products[1][i].sale_price.toLocaleString('pt-br', {
                    style: 'currency',
                    currency: 'BRL',
                })}`,
                category_id: products[1][i].category_id,
                category: products[1][i].category.title,
                unity_id: products[1][i].unity_id,
                unity: products[1][i].unity.name,
                provider_id: products[1][i].provider_id,
                provider: products[1][i].provider.name,
                user_id: products[1][i].user_id,
                user: products[1][i].user.name,
                lot: products[1][i].lot,
                validity: products[1][i].validity,
                quantity: products[1][i].quantity,
                created_at: products[1][i].created_at,
                updated_at: products[1][i].updated_at,
            });
        }
        returnedProducts.push(newArray);
        return res.status(200).json({ products: returnedProducts });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'InternalServerError' });
    }
});
exports.getRegisters = getRegisters;
const getOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const product = yield getProductService_1.getProductService.findOne(id);
        if (!product) {
            return res.status(404).json({ error: 'Not found' });
        }
        return res.status(200).json({ product });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'InternalServerError' });
    }
});
exports.getOne = getOne;
