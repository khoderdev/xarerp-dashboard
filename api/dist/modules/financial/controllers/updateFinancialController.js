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
const getFinancialService_1 = require("../services/getFinancialService");
const getStoreService_1 = require("../../stores/services/getStoreService");
const updateFinancialService_1 = require("../services/updateFinancialService");
const updateOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { type, unity, value } = req.body;
        if ((type !== 0 && type !== 1) && !unity && !value) {
            return res.status(400).json({ error: 'Incomplete data' });
        }
        if (type !== 0 && type !== 1) {
            return res.status(400).json({ error: 'Invalid type' });
        }
        const financial = yield getFinancialService_1.getFinancialService.findOne(id);
        if (!financial) {
            return res.status(404).json({ error: 'Not found' });
        }
        if (unity) {
            const hasStore = yield getStoreService_1.getStoreService.findOne(unity);
            if (!hasStore) {
                return res.status(404).json({ error: 'Store not found' });
            }
        }
        const time = new Date().toISOString();
        const financialUpdated = yield updateFinancialService_1.updateFinancialService.update({
            id,
            data: {
                type,
                unity_id: unity,
                value
            },
            time
        });
        if (!financialUpdated) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.status(200).json({ financial: financialUpdated });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'InternalServerError' });
    }
});
exports.updateOne = updateOne;
