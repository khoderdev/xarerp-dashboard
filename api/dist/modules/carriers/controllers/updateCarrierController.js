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
const updateCarrierService_1 = require("../services/updateCarrierService");
const getCarrierService_1 = require("../services/getCarrierService");
const updateOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, region } = req.body;
        if (!name && !region) {
            return res.status(400).json({ error: 'Incomplete data' });
        }
        const carrier = yield getCarrierService_1.getCarrierService.findOne(id);
        if (!carrier) {
            return res.status(404).json({ error: 'Not found' });
        }
        if (name && (name !== carrier.name)) {
            const hasCarrier = yield getCarrierService_1.getCarrierService.findByName(name);
            if (hasCarrier.length > 0) {
                return res.status(400).json({ error: 'Carrier already exists' });
            }
        }
        const time = new Date().toISOString();
        const carrierUpdated = yield updateCarrierService_1.updateCarrierService.update({
            id,
            data: { name, region },
            time
        });
        if (!carrierUpdated) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.status(200).json({ carrier: carrierUpdated });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'InternalServerError' });
    }
});
exports.updateOne = updateOne;
