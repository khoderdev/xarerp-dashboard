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
const getClientService_1 = require("../services/getClientService");
const getStoreService_1 = require("../../stores/services/getStoreService");
const updateClientService_1 = require("../services/updateClientService");
const updateOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, email, tel, cep, city, state, unity } = req.body;
        if (!name && !email && !tel && !cep && !city && !state && !unity) {
            return res.status(400).json({ error: 'Incomplete data' });
        }
        const client = yield getClientService_1.getClientService.findOne(id);
        if (!client) {
            return res.status(404).json({ error: 'Not found' });
        }
        if (email && (email !== client.email)) {
            const hasClientByEmail = yield getClientService_1.getClientService.findByEmail(email);
            if (hasClientByEmail.length > 0) {
                return res.status(400).json({ error: 'Client with this e-mail already exists' });
            }
        }
        if (tel && (tel !== client.tel)) {
            const hasClientByTel = yield getClientService_1.getClientService.findByTel(tel);
            if (hasClientByTel.length > 0) {
                return res.status(400).json({ error: 'Provider with this tel already exists' });
            }
        }
        if (unity) {
            const hasStore = yield getStoreService_1.getStoreService.findOne(unity);
            if (!hasStore) {
                return res.status(404).json({ error: 'Store not found' });
            }
        }
        const time = new Date().toISOString();
        const clientUpdated = yield updateClientService_1.updateClientService.update({
            id,
            data: {
                name,
                email,
                tel,
                cep,
                city,
                state,
                unity_id: unity
            },
            time
        });
        if (!clientUpdated) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.status(200).json({ client: clientUpdated });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'InternalServerError' });
    }
});
exports.updateOne = updateOne;
