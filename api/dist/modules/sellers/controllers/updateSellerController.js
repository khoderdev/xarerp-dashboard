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
const getSellerService_1 = require("../services/getSellerService");
const updateSellerService_1 = require("../services/updateSellerService");
const getUserService_1 = require("../../users/services/getUserService");
const updateOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { commission, user } = req.body;
        if (!commission && !user) {
            return res.status(400).json({ error: 'Incomplete data' });
        }
        const seller = yield getSellerService_1.getSellerService.findOne(id);
        if (!seller) {
            return res.status(404).json({ error: 'Not found' });
        }
        if (user) {
            const hasUser = yield getUserService_1.getUserService.findOne(user);
            if (!hasUser) {
                return res.status(404).json({ error: 'User not found' });
            }
        }
        const time = new Date().toISOString();
        const sellerUpdated = yield updateSellerService_1.updateSellerService.update({
            id,
            data: {
                user_id: user,
                commission
            },
            time
        });
        if (!sellerUpdated) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.status(200).json({ seller: sellerUpdated });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'InternalServerError' });
    }
});
exports.updateOne = updateOne;
