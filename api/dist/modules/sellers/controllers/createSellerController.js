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
const createSellerService_1 = require("../services/createSellerService");
const getUserService_1 = require("../../users/services/getUserService");
const uuid_1 = require("uuid");
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user, commission } = req.body;
        if (!user || !commission) {
            return res.status(400).json({ error: 'Incomplete data' });
        }
        const hasUser = yield getUserService_1.getUserService.findOne(user);
        if (!hasUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        const seller = yield createSellerService_1.createSellerService.create({
            id: (0, uuid_1.v4)(),
            commission,
            user
        });
        if (!seller) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.status(201).json({ seller });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'InternalServerError' });
    }
});
exports.create = create;
