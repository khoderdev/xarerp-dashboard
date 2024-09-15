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
const createCarrierService_1 = require("../services/createCarrierService");
const getCarrierService_1 = require("../services/getCarrierService");
const uuid_1 = require("uuid");
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, region } = req.body;
        if (!name || !region) {
            return res.status(400).json({ error: 'Incomplete data' });
        }
        const hasCarrier = yield getCarrierService_1.getCarrierService.findByName(name);
        if (hasCarrier.length > 0) {
            return res.status(400).json({ error: 'Carrier already exists' });
        }
        const carrier = yield createCarrierService_1.createCarrierService.create({
            id: (0, uuid_1.v4)(),
            name,
            region
        });
        if (!carrier) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.status(201).json({ carrier });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'InternalServerError' });
    }
});
exports.create = create;
