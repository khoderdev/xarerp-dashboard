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
const getStoreService_1 = require("../services/getStoreService");
const updateStoreService_1 = require("../services/updateStoreService");
const updateOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, type } = req.body;
        if (!name && !type) {
            return res.status(400).json({ error: 'Incomplete data' });
        }
        const store = yield getStoreService_1.getStoreService.findOne(id);
        if (!store) {
            return res.status(404).json({ error: 'Not found' });
        }
        const time = new Date().toISOString();
        const storeUpdated = yield updateStoreService_1.updateStoreService.update({
            id,
            data: {
                name,
                type
            },
            time
        });
        if (!storeUpdated) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.status(200).json({ store: storeUpdated });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'InternalServerError' });
    }
});
exports.updateOne = updateOne;
