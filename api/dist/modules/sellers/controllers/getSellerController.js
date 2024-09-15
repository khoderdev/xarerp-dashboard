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
const getSellerService_1 = require("../services/getSellerService");
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page, q } = req.query;
        const sellers = yield getSellerService_1.getSellerService.listAll(String(q), Number(page));
        if (!sellers) {
            return res.status(404).json({ error: 'Not found' });
        }
        let newArray = [];
        let returnedSellers = [];
        returnedSellers.push(sellers[0]);
        for (let i = 0; i < sellers[1].length; i++) {
            newArray.push({
                id: sellers[1][i].id,
                user_id: sellers[1][i].user_id,
                user: sellers[1][i].user.name,
                commission: sellers[1][i].commission,
                commission_formatted: `${sellers[1][i].commission}%`,
                created_at: sellers[1][i].created_at,
                updated_at: sellers[1][i].updated_at,
            });
        }
        returnedSellers.push(newArray);
        return res.status(200).json({ sellers: returnedSellers });
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
        const sellers = yield getSellerService_1.getSellerService.listAll(String(q), Number(page));
        if (!sellers) {
            return res.status(404).json({ error: 'Not found' });
        }
        let newArray = [];
        let returnedSellers = [];
        returnedSellers.push(sellers[0]);
        for (let i = 0; i < sellers[1].length; i++) {
            newArray.push({
                id: sellers[1][i].id,
                user_id: sellers[1][i].user_id,
                user: sellers[1][i].user.name,
                commission: sellers[1][i].commission,
                commission_formatted: `${sellers[1][i].commission}%`,
                created_at: sellers[1][i].created_at,
                updated_at: sellers[1][i].updated_at,
            });
        }
        returnedSellers.push(newArray);
        return res.status(200).json({ sellers: returnedSellers });
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
        const seller = yield getSellerService_1.getSellerService.findOne(id);
        if (!seller) {
            return res.status(404).json({ error: 'Not found' });
        }
        return res.status(200).json({ seller });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'InternalServerError' });
    }
});
exports.getOne = getOne;
