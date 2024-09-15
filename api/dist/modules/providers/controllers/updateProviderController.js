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
const updateProviderService_1 = require("../../providers/services/updateProviderService");
const getProviderService_1 = require("../../providers/services/getProviderService");
const updateOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, email, tel } = req.body;
        if (!name && !email && !tel) {
            return res.status(400).json({ error: 'Incomplete data' });
        }
        const provider = yield getProviderService_1.getProviderService.findOne(id);
        if (!provider) {
            return res.status(404).json({ error: 'Not found' });
        }
        if (email && (email !== provider.email)) {
            const hasProviderByEmail = yield getProviderService_1.getProviderService.findByEmail(email);
            if (hasProviderByEmail.length > 0) {
                return res.status(400).json({ error: 'Provider with this e-mail already exists' });
            }
        }
        if (tel && (tel !== provider.tel)) {
            const hasProviderByTel = yield getProviderService_1.getProviderService.findByTel(tel);
            if (hasProviderByTel.length > 0) {
                return res.status(400).json({ error: 'Provider with this tel already exists' });
            }
        }
        const time = new Date().toISOString();
        const providerUpdated = yield updateProviderService_1.updateProviderService.update({
            id,
            data: {
                name,
                email,
                tel
            },
            time
        });
        if (!providerUpdated) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.status(200).json({ provider: providerUpdated });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'InternalServerError' });
    }
});
exports.updateOne = updateOne;
