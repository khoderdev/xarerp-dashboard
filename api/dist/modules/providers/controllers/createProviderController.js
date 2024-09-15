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
const createProviderService_1 = require("../../providers/services/createProviderService");
const getProviderService_1 = require("../../providers/services/getProviderService");
const uuid_1 = require("uuid");
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, tel } = req.body;
        if (!name || !email || !tel) {
            return res.status(400).json({ error: 'Incomplete data' });
        }
        const hasProviderByEmail = yield getProviderService_1.getProviderService.findByEmail(email);
        if (hasProviderByEmail.length > 0) {
            return res.status(400).json({ error: 'Provider with this e-mail already exists' });
        }
        const hasProviderByTel = yield getProviderService_1.getProviderService.findByTel(tel);
        if (hasProviderByTel.length > 0) {
            return res.status(400).json({ error: 'Provider with this tel already exists' });
        }
        const provider = yield createProviderService_1.createProviderService.create({
            id: (0, uuid_1.v4)(),
            name,
            email,
            tel
        });
        if (!provider) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.status(201).json({ provider });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'InternalServerError' });
    }
});
exports.create = create;
